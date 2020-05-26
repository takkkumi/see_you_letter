import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { letter } from "../types/letter"
import { format, addDays } from "date-fns"
const db = firebase.firestore()
const now = firebase.firestore.FieldValue.serverTimestamp()
export const postLetter = async (letter: letter) => {
	const today = new Date()
	const dayRef = format(today, "yyyy_MM_dd")
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
