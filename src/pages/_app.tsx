import 'semantic-ui-css/semantic.min.css'
import './styles.css'
import { createContext, useState, useEffect } from 'react'

import { User } from '../types/userTypes'
import firebase from "firebase/app"
import "firebase/auth"


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
!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

export const UserContext = createContext({} as User)

export const MyApp = ({ Component, pageProps }) => {
  const [user, setUser] = useState(null)
  const [storeUser, setStoreUser] = useState(null)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {

    const unsubscribe = firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        if (currentUser !== user) {
          setUser(currentUser)
        }
        setIsLogin(true)
        const getFirestoreState = async () => {
          try {

            let loginUserRef = firebase
              .firestore()
              .collection("user")
              .doc(currentUser.uid)
            let loginUser = await loginUserRef.get()
            setStoreUser({
              data: loginUser.data(),
              ref: loginUserRef
            })

          } catch (error) {
            console.log(error)
          }
        }

        user && getFirestoreState()
      } else {
        setUser(null)
        setIsLogin(false)
        setStoreUser(null)
      }
    })

    console.log("render")
    return () => unsubscribe()
  }, [isLogin])
  return <UserContext.Provider value={{ user, isLogin, storeUser }}>
    <Component {...pageProps} />
  </UserContext.Provider>
}

export default MyApp
