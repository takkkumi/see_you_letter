import firebase from "../../../../actions/firebase"

export default (
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
  try {
    firebase.auth().verifyIdToken(token)
    if (user == headers.uid) {
      firebase
        .firestore()
        .collection("user")
        .doc(user)
        .collection("letters")
        .orderBy("postTime", "desc")
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
