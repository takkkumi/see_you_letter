import { Menu, Dropdown } from "semantic-ui-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext } from "react"
import { UserContext } from "../../pages/_app"
import { LoginUser, LogoutUser } from "../../actions/firebaselogin"
import { storeUserData } from "../../types/userTypes"

const Navbar: React.FC = () => {
  const router = useRouter()
  const navpoint = router.pathname
  const auth = useContext(UserContext)
  const user: storeUserData = auth?.storeUser?.data ?? null

  return (
    <>
      <Menu secondary pointing>
        <Link href="/">
          <Menu.Item active={navpoint === "/"} link>
            {user?.name ?? "Home"}
          </Menu.Item>
        </Link>
        <Link href="/about">
          <Menu.Item active={navpoint === "/about"} link>
            About
          </Menu.Item>
        </Link>

        <Dropdown text="Setting" item>
          <Dropdown.Menu>
            {!auth.isLogin ? (
              <>
                <Dropdown.Item
                  onClick={async () => {
                    await LoginUser()
                    auth.setIsLogin(true)
                  }}
                  text="Login"
                />
                <Dropdown.Item text="Profile" />
              </>
            ) : (
              <Dropdown.Item
                onClick={async () => {
                  await LogoutUser(user)
                  auth.setIsLogin(false)
                }}
                text="Logout"
              />
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </>
  )
}

export default Navbar
