import { Menu, Dropdown } from "semantic-ui-react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from "react"
import { UserContext } from "../../pages/_app"
import { LoginUser, LogoutUser } from "../../pages/actions/firebaselogin"
import { storeUserData } from "../../types/userTypes"



const Navbar: React.FC = () => {
    const router = useRouter()
    const navpoint = router.pathname
    const auth = useContext(UserContext)
    const user: storeUserData = auth?.storeUser?.data ?? null


    return (
        <>
            <Menu secondary pointing>

                <Menu.Menu posotion="left">

                    <Link href="/" >
                        <Menu.Item active={navpoint === "/"} link>
                            {user?.name ?? "Home"}
                        </Menu.Item>
                    </Link>
                    <Link href="/about">
                        <Menu.Item active={navpoint === "/about"} link>
                            About
            </Menu.Item>
                    </Link>
                </Menu.Menu>
                <Menu.Menu posotion="right">
                    <Dropdown text="Setting" item simple>
                        <Dropdown.Menu>
                            {!auth.isLogin ? (
                                <Dropdown.Item onClick={() => LoginUser()}>
                                    LogIn
                                </Dropdown.Item>
                            ) : (
                                    <Dropdown.Item onClick={() => LogoutUser(user)}>
                                        LogOut
                                    </Dropdown.Item>
                                )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        </>
    )



}

export default Navbar
