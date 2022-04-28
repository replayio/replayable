import styles from "../styles/Issues.module.css";
import Image from 'next/image'

function IssueData({title, number, date, author, url, labels}) {
    const formattedDate = new Date(date).toLocaleDateString()
    return (
        <div className={styles.issue}>
            <Image
        className={styles.avatar}
        src={author.avatarUrl}
        alt="Picture of the author"
        height={40}
        width={40}
      />
      <div className={styles.data}>
<a href={url} target="_blank"><span>{title}</span></a>
<div className={styles.muted}><span>Issue #{number}</span> <span>Created on {formattedDate}</span> <span>by <a href={author.url} target="_blank">{author.name}</a></span></div>
</div>
<div className={styles.labels}>
{labels.map((label) => (
// We could pull the actual label color in with style={{backgroundColor:'#' + label.node.color}}
// GitHub uses a lightness switch calculation to determine what font color to use based on the label color
// For now will just use a single color for all labels
    <span >{label.node.name}</span>
))}
</div>
        </div>
        
    )
}

function IssueRow({issue}) {
    return (
<div className={styles.row}>
<IssueData title={issue.title} date={issue.createdAt} author={issue.author} number={issue.number} url={issue.url} labels={issue.labels.edges} />
</div>
    )
}
function IssueSummary({issues}) {
    return (
        <div className={styles.row}>
            <span style={{fontWeight: 'bold'}}>{issues.length} open issues</span>
        </div>
    )
}


function Issues({issues}) {
    return (
        <div className={styles.container}>
            <IssueSummary issues={issues} />
            {issues.map((issue) => (
                <IssueRow issue={issue.node}/>
            ))}
        </div>
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