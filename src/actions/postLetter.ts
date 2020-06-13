import firebase from "./firebaseinit"

import { letter } from "../types/letter"
import { addDays } from "date-fns"
import { japDate } from "../util/Date"

const db = firebase.firestore()
const now = firebase.firestore.FieldValue.serverTimestamp()

const today = new Date()
const dayRef = japDate(today, "yyyy_MM_dd")
export const postLetter = async ({ userUid, text }: letter) => {
	const sendDay = japDate(addDays(today, 3), "yyyy_MM_dd")
	try {
		await db
			.collection("user")
			.doc(userUid)
			.collection("letters")
			.doc(`${userUid}_${dayRef}`)
			.set({
				postDay: dayRef,
				userUid: userUid,
				text: text,
				postTime: now,
				sendDay: sendDay,
				id: `${userUid}_${dayRef}`,
			})
	} catch (error) {
		console.log(error)
	}
	return console.log(dayRef)
}

export const getLetters = async (uid: string, day: Date) => {
	let letters: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>

	// try {
	// 	await db
	// 		.collection("user")
	// 		.doc(uid)
	// 		.collection("letters")
	// 		.orderBy("postTime", "desc")
	// 		.limit(11)
	// 		.get({ source: "cache" })
	// 		.then((doc) => {
	// 			letters = doc
	// 		})

	// 	!letters.docs.length &&
	// 		(await db
	// 			.collection("user")
	// 			.doc(uid)
	// 			.collection("letters")
	// 			.orderBy("postTime", "desc")
	// 			.limit(11)
	// 			.get({ source: "server" })
	// 			.then((doc) => {
	// 				letters = doc
	// 			}))
	// } catch (error) {
	try {
		await db
			.collection("user")
			.doc(uid)
			.collection("letters")
			// .orderBy("postTime", "desc")
			// .limit(11)
			.get()
			.then((doc) => {
				letters = doc
			})
	} catch (error) {
		console.log(error)
	}
	// }
	return letters.docs.map((doc) => console.log(doc.data()))
}
