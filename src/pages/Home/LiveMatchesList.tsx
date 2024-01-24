import React, { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { FiRefreshCw } from "react-icons/fi";
interface Match {
  id: number;
  name: string;
  location: string;
  sportName: string;
  endsAt: string;
  isRunning: boolean;
  teams: { id: number; name: string }[];
  score: Partial<Record<string, string>>;
}

const LiveMatchesList: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  const fetchLiveMatchesData = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/matches`);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      const liveMatchesData = data.matches.filter(
        (match: any) => match.isRunning
      );

      return liveMatchesData;
    } catch (error) {
      console.error("Error fetching live matches data:", error);
      throw error;
    }
  };

  const fetchLiveMatchesDetails = async (liveMatchesData: Match[]) => {
    try {
      const detailsPromises = liveMatchesData.map(async (match) => {
        const matchDetailsResponse = await fetch(
          `${API_ENDPOINT}/matches/${match.id}`
        );
        if (!matchDetailsResponse.ok) {
          throw new Error("Network response for match details was not ok.");
        }
        return matchDetailsResponse.json();
      });

      const liveMatchesDetails = await Promise.all(detailsPromises);
      return liveMatchesDetails;
    } catch (error) {
      console.error("Error fetching live match details:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchDataAndDetails = async () => {
      try {
        const liveMatchesData = await fetchLiveMatchesData();
        console.log("Live data", liveMatchesData);

        const liveMatchesDetails = await fetchLiveMatchesDetails(
          liveMatchesData
        );
        console.log("live data details", liveMatchesDetails);

        setMatches(liveMatchesDetails);
      } catch (error) {
        console.error("Error fetching live matches and details:", error);
      }
    };

    fetchDataAndDetails();
  }, []);

  const refreshMatch = async (matchId: number) => {
    try {
      alert(`Refresh match with ID ${matchId}`);
    } catch (error) {
      alert("Error refreshing match:");
    }
  };

  return (
    <div className="md:-mt-10 p-3 border border-none shadow-sm shadow-black rounded-lg md:m-5 md:bg-gradient-to-r from-red-700 to-green-700">
      <h2 className="text-2xl font-semibold mb-2 md:text-white">
        Live Matches
      </h2>
      <div className="overflow-x-auto">
        <ul className="flex space-x-3">
          {matches
            .filter((match) => match.isRunning)
            .map((match) => (
              <li
                key={match.id}
                className="p-4 mr-4 bg-gray-100 border shadow-lg border-10 border-black-900 rounded-lg min-w-36 w-1/5"
              >
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold font-serif">
                    {match.sportName}
                  </p>
                  <button onClick={()=>refreshMatch(match.id)}>
                    <FiRefreshCw />
                  </button>
                </div>
                <p className="text-lg">{match.location}</p>
                <div className=" text-left font-medium">
                  <p>
                    {match.teams[0]?.name}
                    <span>
                      {"  ( "}
                      {match.score?.[match.teams[0]?.name]}
                      {"* ) "}
                    </span>
                  </p>
                </div>
                <div className=" text-left font-medium">
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
      </div>
    </div>
  );
};

export default LiveMatchesList;
