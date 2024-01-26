// import Articles from '../components/Articles'
// import LiveMatches from '../components/LiveMatches'
import { MatchsProvider } from "../../context/LiveMatches/context";
import AccountLayout from "../../layouts/account/index";
import LiveMatchesList from "./LiveMatchesList";
import Trending from "./Trending";

export const Home = () => {
  return (
    <>
      <AccountLayout />
      <MatchsProvider>
        <LiveMatchesList />
      </MatchsProvider>
      <Trending />
    </>
  );
};
