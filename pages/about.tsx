import Layout from "../components/layouts/BaseLayout"
import { Container, Header } from "semantic-ui-react"


const about = () => {

    return (
        <Layout title="About Page">
            <Container text>
                <Header as="h2">About</Header>
                <p>
                    "See You Letter" is my first portfolio
               </p>
            </Container>
        </Layout>
    )
}

export default about