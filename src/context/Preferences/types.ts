import {Team ,Sport} from "../Article/types"

export const initialStatePreferences: PreferencesListState = {
  yourNews: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export interface PreferencesListState {
  yourNews: Preferences[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
export interface Preferences {
  id: number;
  title: string;
  thumbnail: string;
  date: string;
  summary: string;
  content: string;
  teams: Team[];
  sport: Sport[];
}


export enum PreferencesListAvailableAction {
  FETCH_PREFERENCES_LIST_REQUEST = "FETCH_PREFERENCES_LIST_REQUEST",
  FETCH_PREFERENCES_LIST_SUCCESS = "FETCH_PREFERENCES_LIST_SUCCESS",
  FETCH_PREFERENCES_LIST_FAILURE = "FETCH_PREFERENCES_LIST_FAILURE",
}

export type PreferencesActions =
  | { type: PreferencesListAvailableAction.FETCH_PREFERENCES_LIST_REQUEST }
  | {
      type: PreferencesListAvailableAction.FETCH_PREFERENCES_LIST_SUCCESS;
      payload: Preferences[];
    }
  | {
      type: PreferencesListAvailableAction.FETCH_PREFERENCES_LIST_FAILURE;
      payload: string;
    };

export type PreferencesDispatch = React.Dispatch<PreferencesActions>;
