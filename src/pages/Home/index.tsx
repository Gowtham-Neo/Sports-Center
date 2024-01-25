// import Articles from '../components/Articles'
// import LiveMatches from '../components/LiveMatches'
import AccountLayout from '../../layouts/account/index'
import LiveMatchesList from './LiveMatchesList'
import Trending from './Trending'

export const Home = () => {
  return (
    <>
    <AccountLayout/>
    <LiveMatchesList/>
    <Trending/>
    </>
  )
}
