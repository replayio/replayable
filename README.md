# Replayable.dev

[Replayable](https://replayable.dev) is a collection of Github Issues that include replays.

Replayable is great for finding OSS issues to contribute to. When an issue has a replay, you have everything you need to get started debugging.

Replayable is also great for finding real world issues. If you’re stuck on a React Hooks bug, odds are there is a similar issue that has already been solved.

- **Closed Issues** are great examples of how replays were used to solve real-world bugs.
- **Open Issues** are great for diving into replays and debugging yourself.

The site also has a “buggy” mode that can be enabled by clicking the ✅  icon in the lower right corner. Record the site or **[use the replay here](https://app.replay.io/recording/replayable-buggy-mode--f53b73cc-37bd-48b5-bb8d-db19a93e99be)** to practice debugging these issues!

No installation is required to view replays.

## Replay.io

[Replay](https://replay.io) lets you record a browser session to produce a shareable replay for collaborative debugging. The replay isn’t just a video — everything from the browser is recorded so you can inspect everything including HTML elements, JavaScript execution, network requests, user events, and even the state of your React components at each and every moment in time.

Replay is free for individuals and OSS projects. Check out:

- [replay.io/get-started](https://replay.io/get-started)
- [replay.io/oss](https://replay.io/oss)
- [replay.io/examples](https://replay.io/examples)

## Contributing

This is a Next.js app deployed to Vercel. We welcome contributions. Join us at [replay.io/discord](https://replay.io/discord) to chat with the team and ask questions!

To develop locally, run:

`npm install`

`npm run start`

The app will run on `http://localhost:3000`.

## Automated Testing

This projected uses `@replayio/cypress` and `replayio/action-cypress` to record and upload replays of Cypress tests.

Read more about recording tests in your own project in the [Replay documentation here](https://docs.replay.io/docs/recording-automated-tests-5bf7d91b65cd46deab1867b07bd12bdf).

### Recording in CI

Tests will run automatically on each deployment (including those for pull requests) using `action-cypress`](https://github.com/replayio/action-cypress). The workflow file is [`cypress.yml`](https://github.com/replayio/replayable/blob/main/.github/workflows/cypress.yml).

The workflow can be dispatched manually to select different browsers. 

### Recording locally

To record Cypress tests locally, start the app with `npm run start`, then run:

```bash
npm run cypress:record
```

Use the [`replayio/replay` CLI](https://github.com/replayio/replay-cli/tree/main/packages/replay) to upload and view replays recorded locally. [Documentation here](https://docs.replay.io/docs/recording-tests-9f771761436440e6b672701e6107d2b1#47cea4d90c9f43b08d9ad5a743c49f62).
