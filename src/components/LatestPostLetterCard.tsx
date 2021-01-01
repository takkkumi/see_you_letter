import { useContext, useEffect, useState } from "react"
import { japDate } from "../util/Date"
import firebase from "../actions/firebaseinit"
import "firebase/firestore"
import { UserContext } from "../pages/_app"
import { Container, Divider, Header } from "semantic-ui-react"
import PostLetter from "./PostLetter"

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
	return (
		<Container text textAlign="center">
			{todaysPost && (
				<>
					<Header as="h3">
						{japDate(new Date(), "MM月dd日")}の手紙
					</Header>
					<p
						style={{
							fontFamily:
								"'HanziPen SC','Hannotate SC','Hiragino Sans','ヒラギノ角ゴシック',YuGothic,'Yu Gothic','メイリオ', Meiryo,'ＭＳ Ｐゴシック','MS PGothic'",
							whiteSpace: "pre-wrap",
						}}>
						{todaysPost?.text}
					</p>
					<Divider />
				</>
			)}
			<PostLetter />
		</Container>
	)
}
export default LatestPostLetterCard
