import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCO62xKAzAXIlads1jsxztktt4HgsYavtc",
    authDomain: "see-you-letter.firebaseapp.com",
    databaseURL: "https://see-you-letter.firebaseio.com",
    projectId: "see-you-letter",
    storageBucket: "see-you-letter.appspot.com",
    messagingSenderId: "48383318228",
    appId: "1:48383318228:web:baba75edab6ff382468341",
    measurementId: "G-BJTSQMJV54"
}
export default !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app()