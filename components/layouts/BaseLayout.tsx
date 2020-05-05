import Head from 'next/head'
import Navbar from '../shared/navbar'

type Props = {
    title?: string

}

const Layout: React.FC<Props> = ({ children, title }) => {

    return <>
        <Head>
            <title>{title || "See you Letter"}</title>
        </Head>
        <Navbar />
        {children}
    </>
}

export default Layout