import useSWR from "swr"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./_app"
import firebase from "firebase"
import Layout from "../components/layouts/BaseLayout"
import { useRouter } from "next/router"
import { Card, Container, Header, Button } from "semantic-ui-react"
import { letter } from "../types/letter"
import { dateTransFormToJapDate } from "../util/Date"

const pastLetter = () => {
	const user = useContext(UserContext).user
	let isLogin = useContext(UserContext).isLogin
	const fetcher = async (url: RequestInfo) => {
		const token = await firebase.auth().currentUser.getIdToken()
		const res = await fetch(url, {
			headers: { Authorization: `Bearer ${token}`, Uid: user.uid },
		})
		const data = await res.json()

		if (res.status !== 200) {
			throw new Error(data.message)
		}
		return data
	}
	const [letters, setLetters] = useState([])
	const [hasMore, setHasMore] = useState(true)
	const getNextLetters = async (
		cursorData: firebase.firestore.DocumentData
	) => {
		await firebase
			.firestore()
			.collection("user")
			.doc(user.uid)
			.collection("letters")
			.orderBy("postTime", "desc")
			.startAfter(cursorData.postTime)
			.limit(3)
			.get()
			.then((docs) => {
				const docsData = docs.docs.map((doc) => doc.data())
				setLetters([...letters, ...docsData])
				docs.docs.length < 3 && setHasMore(false)
				console.log(docsData, cursorData.postTime)
			})
		console.log(cursorData)
	}
	const url = `/api/${user?.uid}/letters`

	const { data } = useSWR(url, fetcher, { dedupingInterval: 1000 })

	useEffect(() => {
		const f = async () => {
			setLetters(data)

			const initPostTime = await firebase
				.firestore()
				.collection("user")
				.doc(user.uid)
				.collection("letters")
				.doc(data[0].id)
				.get()
				.then((doc) => doc.data())
			console.log(initPostTime)
			await firebase
				.firestore()
				.collection("user")
				.doc(user.uid)
				.collection("letters")
				.orderBy("postTime", "desc")
				.startAfter(initPostTime.postTime)
				.limit(2)
				.get()
				.then((docs) => {
					const docsData = docs.docs.map((doc) => doc.data())
					setLetters([initPostTime, ...docsData])
					docs.docs.length < 2 && setHasMore(false)
				})
		}
		user && data && f()
	}, [data])
	return (
		<Layout title="Your Letters">
			<Container text>
				<Header as="h2">Letters</Header>
				<Card.Group>
					{letters?.map((letters: letter) => (
						<Card key={letters.id} fluid>
							<Card.Meta
								content={dateTransFormToJapDate(
									letters.postDay
								)}
							/>
							<Card.Description content={letters.text} />
						</Card>
					))}
				</Card.Group>
				{hasMore && (
					<Button
						content="More"
						onClick={() => {
							getNextLetters(letters[letters.length - 1])
						}}
					/>
				)}
			</Container>
		</Layout>
	)
}
export default pastLetter
