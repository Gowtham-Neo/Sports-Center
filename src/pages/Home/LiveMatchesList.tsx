import React, { useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";
import {
  useMatchesState,
  useMatchesDispatch,
} from "../../context/LiveMatches/context"; 
import {
  fetchLiveMatchesAndDetails,
  refreshMatch,
} from "../../context/LiveMatches/action";

const LiveMatchesList: React.FC = () => {
  const { matches, isLoading, isError } = useMatchesState();
  const dispatch = useMatchesDispatch();

  useEffect(() => {
    fetchLiveMatchesAndDetails(dispatch);
  }, [dispatch]);

  const handleRefreshMatch = async (matchId: number) => {
    refreshMatch(dispatch, matchId);
  };

  return (
    <div className="p-3 border border-none rounded-lg shadow-sm md:-mt-10 shadow-black md:m-5 md:bg-gradient-to-r from-red-700 to-green-700">
      <h2 className="mb-2 text-2xl font-semibold md:text-white">
        Live Matches
      </h2>
      <div className="overflow-x-auto w-full">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching live matches</p>}
        {!isLoading && !isError && (
          <ul className="md:flex space-x-3 flex">
            {matches
              .filter((match) => match.isRunning)
              .map((match) => (
                <li
                  key={match.id}
                  className="p-4 mr-4 bg-gray-100 border rounded-lg shadow-lg border-10 border-black-900 sm:w-full "
                >
                  <div className="flex items-center justify-between">
                    <p className="font-serif text-xl font-semibold">
                      {match.sportName}
                    </p>
                    <button onClick={() => handleRefreshMatch(match.id)}>
                      <FiRefreshCw />
                    </button>
                  </div>
                  <p className="text-lg">{match.location}</p>
                  <div className="font-medium text-left ">
                    <p>
                      {match.teams[0]?.name}
                      <span>
                        {"  ( "}
                        {match.score?.[match.teams[0]?.name]}
                        {"* ) "}
                      </span>
                    </p>
                  </div>
                  <div className="font-medium text-left ">
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
  );
};

export default LiveMatchesList;
