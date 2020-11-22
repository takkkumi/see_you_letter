import firebase from "../../../../actions/firebase"
import { addDays } from "date-fns"
import { japDate } from "../../../../util/Date"
export default async (
	req: { query: { user: string }; headers: any },
	res: {
		json: (arg0: (() => FirebaseFirestore.DocumentData)[] | any) => void
	}
) => {
	const {
		query: { user },
		headers,
	} = req
	const token = headers.authorization.split("Bearer ")[1]
	const now = new Date()

	const today = japDate(now, "yyyy_MM_dd")
	let pendingDays = []

	pendingDays.push(today)
	const pending = 3
	for (let i = 1; i < pending; i++) {
		const addPendingDays = addDays(now, -i)
		pendingDays.push(japDate(addPendingDays, "yyyy_MM_dd"))
	}
	console.log(pendingDays)
	try {
		firebase.auth().verifyIdToken(token)
		if (user == headers.uid) {
			let hiddenLatestData: FirebaseFirestore.DocumentData = null
			await firebase
				.firestore()
				.collection("user")
				.doc(user)
				.collection("letters")
				.where("postDay", "in", pendingDays)
				.orderBy("postTime", "asc")
				.limit(3)
				.get()
				.then(
					(docs) =>
						(hiddenLatestData = docs.docs?.length
							? docs.docs[0].data()
							: null)
				)

			const queryFront = firebase
				.firestore()
				.collection("user")
				.doc(user)
				.collection("letters")
				.orderBy("postTime", "desc")
			const query = async (query: firebase.firestore.Query) => {
				await query
					.limit(3)
					.get()
					.then((doc) => {
						res.json(doc.docs.map((doc) => doc.data()))
					})
					.catch((error) => {
						res.json({ error })
					})
			}

			hiddenLatestData
				? query(queryFront.startAfter(hiddenLatestData.postTime))
				: query(queryFront)
		} else {
			res.json({
				message: "your are eveil",
				user: user,
			})
		}
	} catch (error) {
		console.error(error)
	}
}
