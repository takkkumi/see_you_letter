import useSWR from "swr"
import { useContext, useEffect } from "react"
import { UserContext } from "./_app"
import firebase from "firebase"
import Layout from "../components/layouts/BaseLayout"
import { useRouter } from "next/router"

const pastLetter = () => {
	const auth = useContext(UserContext).storeUser
	const router = useRouter()
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
	const { data } = useSWR(() => [`/api/${auth.data.uid}/letters`], fetcher, {
		dedupingInterval: 600000,
	})
	console.log(data)
	useEffect(() => {
		!auth?.data?.uid && router.push("/")
	}, [])
	return <Layout></Layout>
}
export default pastLetter
