import firebase from "./firebaseinit"

import { letter } from "../types/letter"
import { format, addDays } from "date-fns"

const db = firebase.firestore()
const now = firebase.firestore.FieldValue.serverTimestamp()
const today = new Date()
export const dayRef = format(today, "yyyy_MM_dd")
export const postLetter = async (letter: letter) => {
	const sendDay = format(addDays(today, 7), "yyyy_MM_dd")
	try {
		await db
			.collection("user")
			.doc(letter.userUid)
			.collection("letters")
			.doc(`${letter.userUid}_${dayRef}`)
			.set({
				postDay: dayRef,
				userUid: letter.userUid,
				text: letter.text,
				postTime: now,
				sendDay: sendDay,
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
