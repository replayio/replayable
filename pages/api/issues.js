const query = `
query getIssues($labels: [String!]) {
  repository(owner: "RecordReplay", name: "devtools") {
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

  console.log("query", variables);
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables: req.query,
    }),
  });
  const data = await response.json();
  const issues = data.data.repository.issues.edges;
  return res.json(issues);
}
