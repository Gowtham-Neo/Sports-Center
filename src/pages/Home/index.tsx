import { MatchsProvider } from "../../context/LiveMatches/context";
import AccountLayout from "../../layouts/account/index";
import LiveMatchesList from "./LiveMatchesList";
import Trending from "./Trending";
import { ArticlesProvider } from "../../context/Article/context";
import { PreferencesProvider } from "../../context/Preferences/context";
export const Home = () => {
  return (
    <>
      <PreferencesProvider>
        <ArticlesProvider>
          <AccountLayout />
          <MatchsProvider>
            <LiveMatchesList />
          </MatchsProvider>
          <Trending />
        </ArticlesProvider>
      </PreferencesProvider>
    </>
  );
};
