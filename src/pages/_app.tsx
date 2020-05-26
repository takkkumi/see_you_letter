import "semantic-ui-css/semantic.min.css"
import "./styles.css"
import { createContext, useState, useEffect, Dispatch } from "react"

import { User } from "../types/userTypes"
import firebase from "firebase/app"
import "firebase/auth"
import { Dimmer, Segment, Loader } from "semantic-ui-react"

const firebaseConfig = {
	apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STRAGE_BUCKET,
}
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
export type Functions = {
	setUser: Dispatch<any>
	setStoreUser: Dispatch<any>
	setIsLogin: Dispatch<any>
	setIsLoader: Dispatch<any>
}
export const UserContext = createContext({} as User & Functions)

export const MyApp = ({ Component, pageProps }) => {
	const [user, setUser] = useState(null)
	const [storeUser, setStoreUser] = useState(null)
	const [isLogin, setIsLogin] = useState(false)
	const [loader, setIsLoader] = useState(false)

	useEffect(() => {
		const unsubscribe = firebase
			.auth()
			.onAuthStateChanged((currentUser) => {
				if (currentUser) {
					if (currentUser !== user) {
						setUser(currentUser)
					}
					const getFirestoreState = async () => {
						try {
							let loginUserRef = firebase
								.firestore()
								.collection("user")
								.doc(currentUser.uid)
							let loginUser = await loginUserRef.get()
							setStoreUser({
								data: loginUser.data(),
								ref: loginUserRef,
							})
						} catch (error) {
							console.log(error)
						}
					}

					user && getFirestoreState()
				} else {
					setUser(null)
					setStoreUser(null)
				}
			})

		console.log("render")
		return () => unsubscribe()
	}, [isLogin])
	return (
		<UserContext.Provider
			value={{
				user,
				isLogin,
				storeUser,
				setUser,
				setIsLogin,
				setStoreUser,
				setIsLoader,
			}}>
			<Component {...pageProps} />
			{loader && (
				<Dimmer active={loader}>
					<Loader />
				</Dimmer>
			)}
		</UserContext.Provider>
	)
}

export default MyApp
