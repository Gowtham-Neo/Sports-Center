import { Reducer } from "react";
import {
  ArticleListAvailableAction,
  ArticleListState,
  ArticleActions,
  initialStateArticle
} from "./types";


export const articlesReducer: Reducer<ArticleListState, ArticleActions> = (
  state = initialStateArticle,
  action
) => {
  console.log(`HI this Type${action.type}`);
  switch (action.type) {
    case ArticleListAvailableAction.FETCH_ARTICLES_LIST_REQUEST:
      return { ...state, isLoading: true };
    case ArticleListAvailableAction.FETCH_ARTICLES_LIST_SUCCESS:
      console.log("Existing state:", state);
      console.log("New Articles payload:", action.payload);
      return {
        ...state,
        isLoading: false,
        articles:  action.payload ,
      };
    case ArticleListAvailableAction.FETCH_ARTICLES_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    
    default:
      return state;
  }
};