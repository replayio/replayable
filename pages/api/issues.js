const query = `
query getIssues(
  $labels: [String!], 
  $org: String!,
  $repo: String!,
  $state: IssueState!
) {
  repository(owner: $org, name: $repo) {
    issues(last: 50, states: [$state], labels: $labels) {
      edges {
        node {
          title
          url
          labels(first: 5) {
            edges {
              node {
                name
                color
              }
            }
          }
          body
          author {
            ... on User {
              avatarUrl
              name
              url
            }
          }
          number
          createdAt
        }
      }
    }
  }
}`;

export default async function handler(req, res) {
  const variables = {
    ...req.query,
    labels: req.query.labels?.split(",") || "",
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
      variables: variables,
    }),
  });
  const data = await response.json();
  const issues = data.data.repository.issues.edges;
  return res.json(issues);
}
