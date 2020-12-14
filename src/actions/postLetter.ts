import firebase from "./firebaseinit"

import { addDays } from "date-fns"
import { japDate } from "../util/Date"

const db = firebase.firestore()
const now = firebase.firestore.FieldValue.serverTimestamp()

const today = new Date()
const dayRef = japDate(today, "yyyy_MM_dd")
export const postLetter = async (userUid: string, text: string) => {
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
