import firebase from "../../../../actions/firebase"

export default (
	req: { uid: string },
	res: {
		json: (arg0: (() => FirebaseFirestore.DocumentData)[] | any) => void
	}
) => {
	firebase
		.collection("user")
		.doc(req.uid)
		.collection("letters")
		.get()
		.then((doc) => {
			res.json(doc.docs.map((doc) => doc.data()))
		})
		.catch((error) => {
			res.json({ error })
		})
}
