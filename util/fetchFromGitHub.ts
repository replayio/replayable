// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const query = `
query($query: String!) { 
  search(query:$query, type:ISSUE, first: 100) {
		issueCount
		nodes {
      ... on Issue {
        title
        url
        body
        number
        createdAt
        repository {
          name
          url
          owner {
            login
          }
        }
        author {
          ... on User {
            avatarUrl
            name
            url
          }
        }
        labels(first: 5) {
          edges {
            node {
              name
              color
            }
          }
        }
      }
    }
  }
}`;

const excludedRepos = [
    "replayio/backend",
    "replayio/admin",
    "replayio/customer-support",
];

const URL = "https://api.github.com/graphql";

export const fetchFromGitHub = async () => {
    const repoQuery = "";
    const labelQuery = "";
    const exludedRepos = excludedRepos.map((repo) => `-repo:${repo}`).join(" ");
    const ghQuery = `app.replay.io/recording ${exludedRepos} ${labelQuery} ${repoQuery} is:open`;

    const variables = {
        query: ghQuery,
    };

    const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`,
    };

    const response = await fetch(URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
            query,
            variables,
        }),
    });
    const data = await response.json();

    const issues = data.data.search.nodes.filter((issue) => issue.body);
    return issues;
}
