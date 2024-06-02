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
    <div className="p-3 border border-none rounded-lg shadow-sm md:-mt-10 shadow-black md:m-5 bg-gradient-to-r from-red-700 to-green-700">
      <h2 className="mb-2 text-xl font-semibold md:text-2xl md:text-white">
        Live Matches
      </h2>
      <div className="overflow-x-auto ">
        <div className=" w-max">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching live matches</p>}
        {!isLoading && !isError && (
          <ul className="flex space-x-3 md:flex">
            {matches
              .filter((match) => match.isRunning)
              .map((match) => (
                <li
                  key={match.id}
                  className="p-4 mr-4 bg-gray-100 border rounded-lg shadow-lg border-10 border-black-900 "
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
                  <div className="text-left md:font-medium ">
                    <p>
                      {match.teams[0]?.name}
                      <span>
                        {"  ( "}
                        {match.score?.[match.teams[0]?.name]}
                        {"* ) "}
                      </span>
                    </p>
                  </div>
                  <div className="text-left md:font-medium ">
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
  );
};

export default LiveMatchesList;