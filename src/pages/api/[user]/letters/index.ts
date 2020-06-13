import firebase from "../../../../actions/firebase"
import { format, addDays } from "date-fns"
import { ja } from "date-fns/locale"
import { utcToZonedTime } from "date-fns-tz"
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
			let hiddenLatestData: FirebaseFirestore.DocumentData
			await firebase
				.firestore()
				.collection("user")
				.doc(user)
				.collection("letters")
				.where("postDay", "in", pendingDays)
				.orderBy("postTime", "asc")
				.limit(1)
				.get()
				.then((docs) => (hiddenLatestData = docs.docs[0].data()))
			console.log(hiddenLatestData)

			firebase
				.firestore()
				.collection("user")
				.doc(user)
				.collection("letters")
				.orderBy("postTime", "desc")
				.startAfter(hiddenLatestData.postTime)
				.limit(5)
				.get()
				.then((doc) => {
					res.json(doc.docs.map((doc) => doc.data()))
				})
				.catch((error) => {
					res.json({ error })
				})
		} else {
			res.json({
				message: "your are eveil",
				user: user,
			})
		}
	} catch (error) {
		console.error("error")
	}
}
