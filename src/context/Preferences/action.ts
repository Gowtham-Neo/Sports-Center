import { API_ENDPOINT } from "../../config/constants";
import { PreferencesDispatch, PreferencesListAvailableAction } from "./types";

export const fetchPreferencesList = async (dispatch: PreferencesDispatch) => {
  try {
    dispatch({
      type: PreferencesListAvailableAction.FETCH_PREFERENCES_LIST_REQUEST,
    });

    const auth_token = localStorage.getItem("auth_token");

    if (auth_token) {
      const responsePreferences = await fetch(
        `${API_ENDPOINT}/user/preferences`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth_token}`,
          },
        }
      );
      const preferencesData = await responsePreferences.json();

      const responseArticles = await fetch(`${API_ENDPOINT}/articles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const articlesData = await responseArticles.json();

      const selectedTeams = preferencesData?.preferences?.selectedTeams || [];
      const selectedSports = preferencesData?.preferences?.selectedSports || [];

      const filteredArticles = articlesData.filter((article: any) => {
        const articleTeams = article.teams.map(
          (team: { name: any }) => team.name
        );
        return (
          articleTeams.some((team: any) => selectedTeams.includes(team)) ||
          selectedSports.includes(article.sport.name)
        );
      });
      dispatch({
        type: PreferencesListAvailableAction.FETCH_PREFERENCES_LIST_SUCCESS,
        payload: filteredArticles,
      });
    }
  } catch (error) {
    console.log("Error fetching PREFERENCES:", error);
    dispatch({
      type: PreferencesListAvailableAction.FETCH_PREFERENCES_LIST_FAILURE,
      payload: "Unable to load PREFERENCES",
    });
  }
};
