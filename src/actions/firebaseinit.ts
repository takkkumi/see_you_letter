import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import localforage from "localforage"

const firebaseConfig = {
	apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STRAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
}

const firebaseInit = async () => {
	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig)
		try {
			firebase.firestore().settings({
				cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
			})
			await firebase.firestore().enablePersistence({
				synchronizeTabs: true,
			})
		} catch (error) {
			console.log(error)
		}
	} else {
		firebase.app()
	}
}
firebaseInit()
export default firebase
