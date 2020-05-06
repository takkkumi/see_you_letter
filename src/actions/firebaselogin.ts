import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { storeUserData } from "../types/userTypes"
const db = firebase.firestore()
const now = firebase.firestore.FieldValue.serverTimestamp()

export const LoginUser = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    let Login = await firebase.auth().signInWithPopup(provider)
    const isNewUser = Login.additionalUserInfo.isNewUser
    const user = Login.user


    try {
        if (isNewUser) {
            await db
                .collection("user")
                .doc(user.uid)
                .set({
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    userPhoto: user.photoURL,
                    createdAt: now,
                    lastLogin: now,

                })
        } else {
            db.collection("user")
                .doc(user.uid)
                .update({
                    lastLogin: now,

                })
        }
    } catch (error) {
        console.log(error)
    }
}
export const LogoutUser = async (user: firebase.User | storeUserData) => {
    try {
        firebase.auth().signOut()
        db.collection("user")
            .doc(user.uid)
            .update({
                lastLogin: now,

            })

    } catch (error) {
        console.log(error)
    }
}
