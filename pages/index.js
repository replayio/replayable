import styles from "../styles/Home.module.css";
import IssueRow from "../components/IssueRow";
import IssueSummary from "../components/IssueSummary";

function Home({ issues }) {
  return (
    <div className={styles.container}>
      <IssueSummary issues={issues} />
      {issues.map((issue) => (
        <IssueRow key={issue.node.number} issue={issue.node} />
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
                query getIssues {
                    repository(owner: "RecordReplay", name: "devtools") {
                      issues(last: 50, states: OPEN, labels: "has-replay 🚀") {
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
                  }`,
      variables: {},
    }),
  });
  const data = await res.json();
  const issues = data.data.repository.issues.edges;

  return {
    props: {
      issues,
    },
  };
}

export default Home;
