# exit when any command fails
set -e

##############################################################################
# Metadata environment variables that can be overwritten by the build system #
#                                                                            #
# * NOTE: RECORD_REPLAY_API_KEY should already be set in the environment     #
#                                                                            #
##############################################################################

# The command to run to run your tests (including starting servers if necessary)
export TEST_COMMAND=${TEST_COMMAND:-'npm run test:e2e -- -- --browser "Replay Firefox"'}

# The current commit SHA
export RECORD_REPLAY_METADATA_SOURCE_COMMIT_ID=${RECORD_REPLAY_METADATA_SOURCE_COMMIT_ID:-$(git log -1 --pretty="format:%H")}

##############################################################################
# The build script with the following steps:                                 #
#                                                                            #
# * Run $TEST_COMMAND                                                        #
# * Attach metadata to recorded tests                                        #
# * Upload all tests                                                         #
# * Generate a link to the test run on app.replay.io                         #
#                                                                            #
##############################################################################

# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap 'EXIT_CODE=$? CMD=${last_command}; test $EXIT_CODE -ne 0 && echo "\n\n\"${CMD}\" command filed with exit code $EXIT_CODE."' EXIT

# Set up Replay-specific environment variables
export RECORD_REPLAY_TEST_RUN_ID=$(uuidgen | tr A-Z a-z)
export RECORD_REPLAY_METADATA_FILE=$(mktemp)
export RECORD_ALL_CONTENT=1
export RECORD_REPLAY_API_SERVER=${RECORD_REPLAY_API_SERVER:-https://api.replay.io}

CWD=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd );

# Install dependencies for this script
npm i --prefix $CWD @replayio/replay@0.0.0-experimental-747d6cb4 node-fetch@2.x

# Clean up any prior recodings before starting
npx @replayio/replay rm-all

# Start Dev Server or configure BASE_URL and run your tests
eval ${TEST_COMMAND} || true

cd $CWD

# Merge in source control-related metadata.
node -e "
  console.log('\n');
  if (!process.env.RECORD_REPLAY_TEST_RUN_ID) {
    console.error('ERROR: RECORD_REPLAY_TEST_RUN_ID is required but was not set');
    process.exit(1);
  }

  const cli = require('@replayio/replay');
  const { source } = require('@replayio/replay/metadata');

  console.log('Finding replays from test run', process.env.RECORD_REPLAY_TEST_RUN_ID)
  const recordings = cli.listAllRecordings()
    .filter(r => r.metadata?.test?.run?.id === process.env.RECORD_REPLAY_TEST_RUN_ID);

  if (recordings.length === 0) {
    console.error('ERROR: No replays found');
    process.exit(1);
  }

  console.log('Generating source control metadata');
  const metadata = source.init();

  console.log('Updating metadata for', recordings.length, 'test run replays');
  recordings.forEach(r => cli.addLocalRecordingMetadata(r.id, metadata));"

# Upload the replays
npx -y @replayio/replay upload-all

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