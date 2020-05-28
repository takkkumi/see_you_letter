import useSWR from "swr"
import { useContext } from "react"
import { UserContext } from "./_app"
import firebase from "firebase"

const pastLetter = () => {
	const auth = useContext(UserContext).storeUser
	const fetcher = async (url: RequestInfo) => {
		const token = await firebase.auth().currentUser.getIdToken()
		const res = await fetch(url, {
			headers: { Authorization: `Bearer ${token}`, Uid: auth.data.uid },
		})
		const data = await res.json()

		if (res.status !== 200) {
			throw new Error(data.message)
		}
		return data
	}
	const { data } = useSWR(() => [`/api/${auth.data.uid}/letters`], fetcher)
	console.log(data)
	return <></>
}
export default pastLetter
