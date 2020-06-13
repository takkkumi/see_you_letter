export type letter = {
  userUid: string
  text: string
  postTime?: firebase.firestore.FieldValue
  photoURL?: string
  postDay?: string
  sendDay?: string
}
