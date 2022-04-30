const query = `
query getIssues(
  $labels: [String!], 
  $owner: String!, 
  $repo: String!
) {
  repository(owner: $owner, name: $repo) {
    issues(last: 50, states: OPEN, labels: $labels) {
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

  console.log(
    "...\n",
    query,
    "\n\n",
    JSON.stringify(variables, null, 2),
    "\nheaders\n",
    JSON.stringify(headers, null, 2)
  );
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables: req.query,
    }),
  });
  const data = await response.json();
  const issues = data.data.repository.issues.edges;
  console.log("issues", issues);
  return res.json(issues);
}
