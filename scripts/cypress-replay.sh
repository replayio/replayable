# exit when any command fails
set -e

# The command to run to run your tests (including starting servers if necessary)
export TEST_COMMAND=${TEST_COMMAND:-'npm run test:e2e -- -- --browser "Replay Firefox"'}

# Set up Replay-specific environment variables
export RECORD_REPLAY_TEST_RUN_ID=$(npx uuid)
export RECORD_REPLAY_METADATA_FILE=$(mktemp)
export RECORD_ALL_CONTENT=1
export RECORD_REPLAY_API_SERVER=${RECORD_REPLAY_API_SERVER:-https://api.replay.io}

CWD=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd );

# Install dependencies for this script
npm i --prefix $CWD @replayio/replay@0.0.0-experimental-2640f652

# Start Dev Server or configure BASE_URL and run your tests
eval ${TEST_COMMAND} || true

cd $CWD

replay metadata --init --keys source --warn
replay upload-all