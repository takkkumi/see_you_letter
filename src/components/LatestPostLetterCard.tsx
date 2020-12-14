import { useContext, useEffect, useState } from "react"
import { japDate } from "../util/Date"
import firebase from "../actions/firebaseinit"
import "firebase/firestore"
import { UserContext } from "../pages/_app"
import { Card, Container, Divider, Header, Item } from "semantic-ui-react"

const LatestPostLetterCard = () => {
	const user = useContext(UserContext).storeUser.data
	const [todaysPost, setTodaysPost] = useState(null)
	const today = japDate(new Date(), "yyyy_MM_dd")
	const postSnapshotQuery = firebase
		.firestore()
		.collection("user")
		.doc(user.uid)
		.collection("letters")
		.doc(`${user.uid}_${today}`)
	useEffect(() => {
		postSnapshotQuery.onSnapshot((doc) => {
			setTodaysPost(doc.data())
		})
		return postSnapshotQuery.onSnapshot(() => {})
	}, [])
	return todaysPost ? (
		<Container text>
			<Header as="h3">{japDate(new Date(), "MM月dd日")}の手紙</Header>
			<p style={{ fontFamily: "sans-serif", whiteSpace: "pre-wrap" }}>
				{todaysPost?.text}
			</p>
			<Divider />
		</Container>
	) : null
}
export default LatestPostLetterCard
