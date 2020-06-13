import useSWR, { useSWRPages } from "swr"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./_app"
import firebase from "firebase"
import Layout from "../components/layouts/BaseLayout"
import { useRouter } from "next/router"
import { Card, Container, Header } from "semantic-ui-react"
import { letter } from "../types/letter"
import { dateTransFormToJapDate } from "../util/Date"

const pastLetter = () => {
  const user = useContext(UserContext).user
  const [auth, setAuth] = useState(user)
  let isLogin = useContext(UserContext).isLogin
  const router = useRouter()
  const fetcher = async (url: RequestInfo) => {
    const token = await firebase.auth().currentUser.getIdToken()
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Uid: auth.uid },
    })
    const data = await res.json()

    if (res.status !== 200) {
      throw new Error(data.message)
    }
    return data
  }
  const [offset, setOffset] = useState(null)
  let url = offset
    ? `/api/${auth?.uid}/letters/${offset}`
    : `/api/${auth?.uid}/letters`

  const { data: letters } = useSWR(url, fetcher, { dedupingInterval: 1000 })

  useEffect(() => {
    isLogin && setAuth(user)
    return () => {}
  }, [isLogin])
  return (
    <Layout title="Your Letters">
      <Container text>
        <Header as="h2">Letters</Header>
        <Card.Group>
          {letters?.map((letters: letter) => (
            <Card key={letters.postDay} fluid>
              <Card.Meta content={dateTransFormToJapDate(letters.postDay)} />
              <Card.Description content={letters.text} />
            </Card>
          ))}
        </Card.Group>
      </Container>
    </Layout>
  )
}
export default pastLetter
