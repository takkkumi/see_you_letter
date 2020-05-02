import { Menu } from "semantic-ui-react"
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
    navpoint: string
}

const Navbar: React.FC = (): JSX.Element => {
    const router = useRouter()
    const navpoint = router.pathname
    return (
        <>

            <Menu secondary pointing>
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
            </Menu>
        </>
    )



}

export default Navbar
