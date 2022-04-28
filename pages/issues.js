function Issues({issues}) {
    return (
        <ul>
            {issues.map((issue) => (
                <li>{issue.title}</li>
            ))}
        </ul>
    )
}

    export async function getStaticProps() {
        const res = await fetch('http://localhost:3000/api/issues')
        const issues = await res.json()

        return {
            props: {
                issues,
            }
        }
    }


export default Issues