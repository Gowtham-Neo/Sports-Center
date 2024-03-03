import { Reducer } from "react";
import {
  PreferencesListAvailableAction,
  PreferencesListState,
  PreferencesActions,
  initialStatePreferences
} from "./types";


export const PreferencessReducer: Reducer<PreferencesListState, PreferencesActions> = (
  state = initialStatePreferences,
  action
) => {
  switch (action.type) {
    case PreferencesListAvailableAction.FETCH_PREFERENCES_LIST_REQUEST:
      return { ...state, isLoading: true };
    case PreferencesListAvailableAction.FETCH_PREFERENCES_LIST_SUCCESS:
      
      return {
        ...state,
        isLoading: false,
        yourNews:  action.payload ,
      };
    case PreferencesListAvailableAction.FETCH_PREFERENCES_LIST_FAILURE:
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