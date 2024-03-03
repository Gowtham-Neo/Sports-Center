import { API_ENDPOINT } from "../../config/constants";
import { ArticleDispatch, ArticleListAvailableAction } from "./types";

export const fetchArticles = async (dispatch: ArticleDispatch) => {
  try {
    dispatch({ type: ArticleListAvailableAction.FETCH_ARTICLES_LIST_REQUEST });
    const response = await fetch(`${API_ENDPOINT}/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const articles = await response.json();
    dispatch({
      type: ArticleListAvailableAction.FETCH_ARTICLES_LIST_SUCCESS,
      payload: articles,
    });
  } catch (error) {
    console.log("Error fetching Articles:", error);
    dispatch({
      type: ArticleListAvailableAction.FETCH_ARTICLES_LIST_FAILURE,
      payload: "Unable to Fetch Articles",
    });
  }
};
