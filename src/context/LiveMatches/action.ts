import { API_ENDPOINT } from "../../config/constants";
import {
  MatchesListAvailableAction,
  MatchDispatch,
  Match
} from "./types";

export const fetchLiveMatchesAndDetails = async (dispatch: MatchDispatch) => {
  try {
    dispatch({ type: MatchesListAvailableAction.FETCH_MATCHES_LIST_REQUEST });

    const matchesResponse = await fetch(`${API_ENDPOINT}/matches`);
    if (!matchesResponse.ok) {
      throw new Error("Error while fetching live matches");
    }
    const matchesData = await matchesResponse.json();
    const liveMatchesData = matchesData.matches.filter(
      (match: any) => match.isRunning
    );

       const detailsPromises = liveMatchesData.map(async (match:any) => {
      const matchDetailsResponse = await fetch(
        `${API_ENDPOINT}/matches/${match.id}`
      );
      if (!matchDetailsResponse.ok) {
        throw new Error("Network response for match details was not ok.");
      }
      return matchDetailsResponse.json();
    });

    const liveMatchesDetails = await Promise.all(detailsPromises);

    dispatch({
      type: MatchesListAvailableAction.FETCH_MATCHES_LIST_SUCCESS,
      payload: liveMatchesDetails,
    });

  } catch (error) {
    console.error("Error fetching live matches and details:", error);
    dispatch({
      type: MatchesListAvailableAction.FETCH_MATCHES_LIST_FAILURE,
      payload: "Unable to fetch live matches and details",
    });
  }
};

export const refreshMatch = async (
  dispatch: MatchDispatch,
  matchId: number
) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/matches/${matchId}`);

    if (!response.ok) {
      throw new Error("Error while refreshing match");
    }

    const updatedMatch: Match = await response.json();

    dispatch({
      type: MatchesListAvailableAction.REFRESH_MATCH_SUCCESS,
      payload: [updatedMatch], 
    });
  } catch (error) {
    console.error(`Error refreshing match with ID ${matchId}:`, error);
    dispatch({
      type: MatchesListAvailableAction.FETCH_MATCHES_LIST_FAILURE,
      payload: "Unable to refresh match",
    });
  }
};