export type storeUserData = {


    uid: string
    name: string
    email: string
    userPhoto: string
    createdAt: firebase.firestore.FieldValue
    lastLogin: firebase.firestore.FieldValue


}
export type User = {
    user?: firebase.User
    storeUser?: {
        data: storeUserData
        ref: firebase.firestore.DocumentReference
    }
    isLogin: boolean
}