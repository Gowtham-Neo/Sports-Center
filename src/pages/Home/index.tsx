import React, { Suspense } from "react";
import { MatchsProvider } from "../../context/LiveMatches/context";
import AccountLayout from "../../layouts/account/index";
const LiveMatchesList = React.lazy(() => import("./LiveMatchesList"));
import Trending from "./Trending";
import { ArticlesProvider } from "../../context/Article/context";
import { PreferencesProvider } from "../../context/Preferences/context";
import ErrorBoundary from "../../components/ErrorBoundary";
const Home = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <PreferencesProvider>
            <ArticlesProvider>
              <AccountLayout />
              <MatchsProvider>
                <LiveMatchesList />
              </MatchsProvider>
              <Trending />
            </ArticlesProvider>
          </PreferencesProvider>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Home;

