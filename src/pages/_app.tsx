import 'semantic-ui-css/semantic.min.css'
import './styles.css'
import { createContext, useState, useEffect } from 'react'
import firebase from "../../config/firebaseConfig"
import { User } from '../types/userTypes'


export const UserContext = createContext({} as User)

export const MyApp = ({ Component, pageProps }) => {
  const [user, setUser] = useState(null)
  const [storeUser, setStoreUser] = useState(null)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        if (currentUser !== user) {
          setUser(currentUser)
        }
        setIsLogin(true)
        const getFirestoreState = async () => {
          try {
            if (user) {
              let loginUserRef = firebase
                .firestore()
                .collection("user")
                .doc(user.uid)
              let loginUser = await loginUserRef.get()
              setStoreUser({
                data: loginUser.data(),
                ref: loginUserRef
              })
            }
          } catch (error) {
            console.log(error)
          }
        }

        getFirestoreState()
      } else {
        const f = async () => {
          await firebase
            .firestore()
            .collection("user")
            .doc(user.uid)
            .update({ isLogin: false })
        }
        user && f()
        setUser(null)
        setIsLogin(false)
        setStoreUser(null)
      }
    })

    console.log("render")

  }, [isLogin])
  return <UserContext.Provider value={{ user, isLogin, storeUser }}>
    <Component {...pageProps} />
  </UserContext.Provider>
}

export default MyApp
