function Issues({issues}) {
    return (
        <ul>
            {issues.map((issue) => (
                <li>{issue.node.title}</li>
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
                    repository(owner:"octocat", name:"Hello-World") {
                        issues(last:20, states:CLOSED) {
                          edges {
                            node {
                              title
                              url
                              labels(first:5) {
                                edges {
                                  node {
                                    name
                                  }
                                }
                              }
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