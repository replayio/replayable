function Issues({issues}) {
    return (
        <ul>
            {issues.map((issue) => (
                <li>{JSON.stringify(issue.node)}</li>
            ))}
        </ul>
    )
}

    export async function getStaticProps() {
        const res = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${process.env.GITHUB_API_TOKEN}`
            },
            body: JSON.stringify({
                query: `
                query getIssues {
                    repository(owner: "RecordReplay", name: "devtools") {
                      issues(last: 20, states: OPEN, labels: "has-replay 🚀") {
                        edges {
                          node {
                            title
                            url
                            labels(first: 5) {
                              edges {
                                node {
                                  name
                                }
                              }
                            }
                            body
                          }
                        }
                      }
                    }
                  }`,
                variables: {}
            })
        })
        const data = await res.json()
        const issues = data.data.repository.issues.edges

        return {
            props: {
                issues,
            }
        }
    }


export default Issues