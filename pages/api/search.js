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

export default async function handler(req, res) {

  const { repo, org, state, labels } = req.query;
  const repoQuery = repo != "" ? `repo:${org}/${repo}` : "";
  const labelQuery = labels
    .split(",")
    .map((label) => `label:"${label}"`)
    .join(" ");
  const variables = {
    query: `${labelQuery} ${repoQuery} is:${state}`,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`,
  };

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const data = await response.json();
  const issues = data.data.search.nodes;
  return res.json(issues);
}
