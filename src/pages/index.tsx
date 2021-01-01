import { Header } from "semantic-ui-react"
import Layout from "../components/layouts/BaseLayout"
import { UserContext } from "./_app"
import { useContext } from "react"
import LatestPostLetterCard from "../components/LatestPostLetterCard"

const Home = () => {
	const context = useContext(UserContext)
	return (
		<Layout>
			{context.storeUser ? (
				<LatestPostLetterCard />
			) : (
				<Header as="h1">See you letter</Header>
			)}
		</Layout>
	)
}

export default Home
