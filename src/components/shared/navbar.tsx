import { Menu, Dropdown } from "semantic-ui-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext } from "react"
import { UserContext } from "../../pages/_app"
import { LoginUser, LogoutUser } from "../../actions/firebaselogin"
import { storeUserData } from "../../types/userTypes"
import { pagesPath } from "../../lib/$path"

const Navbar: React.FC = () => {
	const router = useRouter()
	const navpoint = router.pathname
	const auth = useContext(UserContext)
	const user: storeUserData = auth?.storeUser?.data ?? null

	return (
		<>
			<Menu secondary pointing fixed="top" inverted color="grey">
				<Link href={pagesPath.$url()}>
					<Menu.Item
						active={navpoint === pagesPath.$url().pathname}
						link>
						{user?.name ? "Post" : "Home"}
					</Menu.Item>
				</Link>
				<Link href={pagesPath.about.$url()}>
					<Menu.Item
						active={navpoint === pagesPath.about.$url().pathname}
						link>
						About
					</Menu.Item>
				</Link>
				{auth.isLogin && (
					<Link href={pagesPath.pastLetter.$url()}>
						<Menu.Item
							active={
								navpoint ===
								pagesPath.pastLetter.$url().pathname
							}
							link>
							pastLetter
						</Menu.Item>
					</Link>
				)}

				<Dropdown text="Setting" item>
					<Dropdown.Menu>
						{!auth.isLogin ? (
							<>
								<Dropdown.Item
									onClick={async () => {
										await LoginUser()
										auth.setIsLogin(true)
										router.push("/")
									}}
									text="Login"
								/>
							</>
						) : (
							<>
								<Dropdown.Item
									onClick={async () => {
										await LogoutUser(user)
										auth.setIsLogin(false)
										router.push("/")
									}}
									text="Logout"
								/>
								<Dropdown.Item text="Profile" />
							</>
						)}
					</Dropdown.Menu>
				</Dropdown>
				{user && (
					<Menu.Menu position="right">
						<Menu.Item header content={user?.name} />
					</Menu.Menu>
				)}
			</Menu>
		</>
	)
}

export default Navbar
