import { useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import {
  useMatchesState,
  useMatchesDispatch,
} from "../../context/LiveMatches/context";
import {
  fetchLiveMatchesAndDetails,
  refreshMatch,
} from "../../context/LiveMatches/action";

import Chat from "../../components/chat";
import { apiKey } from "../../config/constants";

const LiveMatchesList = () => {
  const { matches, isLoading, isError } = useMatchesState();
  const dispatch = useMatchesDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    fetchLiveMatchesAndDetails(dispatch);
  }, [dispatch]);

  const handleRefreshMatch = async (matchId: number) => {
    refreshMatch(dispatch, matchId);
  };

  return (
    <>
      <div className="flex flex-col p-3 border border-none rounded-lg shadow-sm md:flex-row md:m-5 bg-gradient-to-r from-red-700 to-green-700">
        <div className="flex-1">
          <h2 className="mb-2 text-xl font-semibold text-white md:text-2xl">
            {t("LiveMatches")}
          </h2>
          <div className="overflow-x-auto">
            <div className="w-max">
              {isLoading && <p className="text-white">Loading...</p>}
              {isError && (
                <p className="text-white">Error fetching live matches</p>
              )}
              {!isLoading && !isError && (
                <ul className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
                  {matches
                    .filter((match) => match.isRunning)
                    .map((match) => (
                      <li
                        key={match.id}
                        className="p-4 bg-gray-100 border border-black rounded-lg shadow-lg"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-serif font-semibold md:text-xl">
                            {match.sportName}
                          </p>
                          <button onClick={() => handleRefreshMatch(match.id)}>
                            <FiRefreshCw />
                          </button>
                        </div>
                        <p className="md:text-lg">{match.location}</p>
                        <div className="text-left md:font-medium">
                          <p>
                            {match.teams[0]?.name}
                            <span>
                              {"  ( "}
                              {match.score?.[match.teams[0]?.name]}
                              {"* ) "}
                            </span>
                          </p>
                        </div>
                        <div className="text-left md:font-medium">
                          <p>
                            {match.teams[1]?.name}
                            <span>
                              {"  ( "}
                              {match.score?.[match.teams[1]?.name]}
                              {"* ) "}
                            </span>
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <Chat apiKey={apiKey} />
    </>
  );
};

export default LiveMatchesList;
