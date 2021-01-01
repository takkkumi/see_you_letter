import "semantic-ui-css/semantic.min.css"
import "../styles.css"
import { createContext, useState, useEffect, Dispatch } from "react"

import { User } from "../types/userTypes"

import { Container, Dimmer, Loader } from "semantic-ui-react"
import firebase from "../actions/firebaseinit"

export type Functions = {
	setUser: Dispatch<any>
	setStoreUser: Dispatch<any>
	setIsLogin: Dispatch<any>
	setIsLoading: Dispatch<any>
}

export const UserContext = createContext({} as User & Functions)

export const MyApp = ({ Component, pageProps }) => {
	const [user, setUser] = useState(null)
	const [storeUser, setStoreUser] = useState(null)
	const [isLogin, setIsLogin] = useState(false)
	const [loading, setIsLoading] = useState(false)

	useEffect(() => {
		const unsubscribe = firebase
			.auth()
			.onAuthStateChanged(async (currentUser) => {
				if (currentUser) {
					if (currentUser !== user) {
						setUser(currentUser)
					}
					const getFirestoreState = async (user: firebase.User) => {
						try {
							let loginUserRef = firebase
								.firestore()
								.collection("user")
								.doc(user.uid)
							let loginUser = await loginUserRef.get()
							setStoreUser({
								data: loginUser.data(),
								ref: loginUserRef,
							})
						} catch (error) {
							console.log(error)
						}
					}

					await getFirestoreState(currentUser)
					setIsLogin(true)
				} else {
					setUser(null)
					setStoreUser(null)
				}
			})

		console.log("render")

		return () => {
			unsubscribe()
		}
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
				setIsLoading,
			}}>
			<Container>
				<Component {...pageProps} />
			</Container>
			{loading && (
				<Dimmer active>
					<Loader />
				</Dimmer>
			)}
		</UserContext.Provider>
	)
}

export default MyApp
