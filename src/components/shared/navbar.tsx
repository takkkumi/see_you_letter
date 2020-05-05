import { Menu, Dropdown } from "semantic-ui-react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../pages/_app"
import { japDate } from "../../util/Date"
import { LoginUser, LogoutUser } from "../../actions/firebaselogin"
import { storeUserData } from "../../types/userTypes"

type Props = {
    navpoint: string
}

const Navbar: React.FC = () => {
    const router = useRouter()
    const navpoint = router.pathname
    const auth = useContext(UserContext)
    const user: storeUserData = auth?.storeUser?.data ?? null


    return (
        <>

            <Menu secondary pointing>

                <Menu.Menu posotion="left">
                    {user && <Menu.Item header>{user.name}</Menu.Item>}
                    <Link href="/" >
                        <Menu.Item active={navpoint === "/"} link>
                            Home
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
