import { Icon, Header } from 'semantic-ui-react'
import Layout from '../components/layouts/BaseLayout'
import { UserContext } from './_app'
import { useContext } from 'react'
import PostLetter from '../components/PostLetter'



const Home = () => {
  const context = useContext(UserContext)

  return <Layout>
    {context.storeUser ? <PostLetter /> :
      <Header as="h1">
        See you letter
      </Header>}
  </Layout>
}


export default Home