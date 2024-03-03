import { Reducer } from "react";
import {
  MatchesListAvailableAction,
  MatchesListState,
  MatchActions,
  initialStateMatches,
} from "./types";

export const matchReducer: Reducer<MatchesListState, MatchActions> = (
  state = initialStateMatches,
  action
) => {
  switch (action.type) {
    case MatchesListAvailableAction.FETCH_MATCHES_LIST_REQUEST:
      return { ...state, isLoading: true };
    case MatchesListAvailableAction.FETCH_MATCHES_LIST_SUCCESS:
      
      return {
        ...state,
        isLoading: false,
        matches: action.payload,
      };
    case MatchesListAvailableAction.FETCH_MATCHES_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

      case MatchesListAvailableAction.REFRESH_MATCH_SUCCESS:
        if (Array.isArray(state.matches)) {
          const updatedMatchIndex = state.matches.findIndex(
            (match) => match.id === action.payload[0].id
          );
  
          if (updatedMatchIndex !== -1) {
            const updatedMatches = [...state.matches];
            updatedMatches[updatedMatchIndex] = action.payload[0];
  
            return {
              ...state,
              matches: updatedMatches,
            };
          }
        }
        return state;
      }
  };