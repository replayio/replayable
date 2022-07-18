# exit when any command fails
set -e

# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap 'EXIT_CODE=$? CMD=${last_command}; test $EXIT_CODE -ne 0 && echo "\n\n\"${CMD}\" command filed with exit code $EXIT_CODE."' EXIT

# RECORD_REPLAY_API_KEY should already be set in the environment

# Set up Replay-specific environment variables
export RECORD_REPLAY_TEST_RUN_ID=$(uuidgen | tr A-Z a-z)
export RECORD_REPLAY_METADATA_FILE=$(mktemp)
export RECORD_ALL_CONTENT=1
export RECORD_REPLAY_API_SERVER=${RECORD_REPLAY_API_SERVER:-https://api.replay.io}

# Start Dev Server or configure BASE_URL and run your tests
npm run test:e2e -- -- --browser "Replay Firefox" || true

# Merge in source control-related metadata. The environment variables used are
# the required data elements:
#  * GIT_LOCAL_BRANCH
#  * BUILD_USER_ID
#  * GIT_COMMIT
#  * GIT_COMMIT_MESSAGE
npm i @replayio/replay@latest node-fetch@2.x
node -e "
  console.log('\n');
  if (!process.env.RECORD_REPLAY_TEST_RUN_ID) {
    console.error('ERROR: RECORD_REPLAY_TEST_RUN_ID is required but was not set');
    process.exit(1);
  }

  const cli = require('@replayio/replay');
  const { source } = require('@replayio/replay/metadata');
  const mergeId = undefined;                  // PR number
  console.log('Generating source control metadata');
  const metadata = source.init({
    branch: process.env.GIT_LOCAL_BRANCH,     // branch name
    provider: undefined,                      // change or remove if not using GitHub
    repository: undefined,                    // full name of the repo (e.g. replayio/my-new-app)
    trigger: {
      user: process.env.BUILD_USER_ID,        // user that triggered the build (e.g. the commit author or user triggering the job)
      name: 'pull_request',                   // type of event that triggered the test run (e.g. pull_request, workflow_dispatch)
      workflow: undefined,                    // id fo the workflow/pipeline run
      url: undefined                          // URL of the workflow/pipeline that triggered the run
    },
    commit: {
      id: process.env.GIT_COMMIT,             // SHA of the head of the branch
      title: process.env.GIT_COMMIT_MESSAGE,  // first line of the commit msg
    },
    merge: mergeId ? {
      id: mergeId,
      title: undefined,                       // PR title
    } : undefined,
  });

  console.log('Finding replays from test run', process.env.RECORD_REPLAY_TEST_RUN_ID)
  const recordings = cli.listAllRecordings()
    .filter(r => r.metadata?.test?.run?.id === process.env.RECORD_REPLAY_TEST_RUN_ID);

  if (recordings.length === 0) {
    console.error('ERROR: No replays found');
    process.exit(1);
  }

  console.log('Updating metadata for', recordings.length, 'test run replays');
  recordings.forEach(r => cli.addLocalRecordingMetadata(r.id, metadata));"

# Upload the replays
npx -y @replayio/replay@latest upload-all

# Generate a link to view the test run
node -e "
  require('node-fetch')(
    process.env.RECORD_REPLAY_API_SERVER + '/v1/graphql',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.RECORD_REPLAY_API_KEY },
      body: JSON.stringify({query: 'query GetWS{auth{workspaces{edges{node{id}}}}}'})
    }
  )
  .then(resp => resp.json())
  .then(json => {
    if (json.errors) {
      throw new Error(json.errors[0].message);
      }
      
      return json?.data?.auth?.workspaces?.edges?.[0]?.node?.id;
  })
  .then(teamId => {
    if (teamId) {
      console.log(\`View your test run: https://app.replay.io/team/\${teamId}/runs/\${process.env.RECORD_REPLAY_TEST_RUN_ID}\`);
    }
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });
"