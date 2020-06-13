import { useEffect, useContext } from "react"
import { UserContext } from "../../pages/_app"

const todaysLetter = async () => {
  const user = useContext(UserContext).storeUser
  const today = new Date()
  return {}
}
export default todaysLetter
