import Head from 'next/head'
import { Container, Grid } from 'semantic-ui-react'
import Navbar from '../shared/navbar'

type Props = {
    title?: string

}

const Layout: React.FC<Props> = ({ children, title }) => {

    return <>
   
        <Head>
            <title>{title || "See you Letter"}</title>
        </Head>
        <Grid>
            <Grid.Row>
        <Navbar />
        </Grid.Row>
        <Grid.Row>
        {children}
        </Grid.Row>
        </Grid>
    </>
}

export default Layout