
export const initialStateMatches: MatchesListState = {
  matches: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export interface MatchesListState {
  matches: Match[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export interface Match {
  id: number;
  name: string;
  location: string;
  sportName: string;
  endsAt: string;
  isRunning: boolean;
  teams: Team[];
  score: Partial<Record<string, string>>;
}
export interface Team {
  id: number;
  plays: string;
  name: string;
}
export const initialStateSport: Team = {
  id: 1,
  name :"Thunderbolts",
  plays: "Basketball"
};

export enum MatchesListAvailableAction {
  FETCH_MATCHES_LIST_REQUEST = "FETCH_MATCHES_LIST_REQUEST",
  FETCH_MATCHES_LIST_SUCCESS = "FETCH_MATCHES_LIST_SUCCESS",
  FETCH_MATCHES_LIST_FAILURE = "FETCH_MATCHES_LIST_FAILURE",
  REFRESH_MATCH_SUCCESS = "REFRESF_MATCH_SUCCESS",
}

export type MatchActions =
  | { type: MatchesListAvailableAction.FETCH_MATCHES_LIST_REQUEST }
  | {
      type: MatchesListAvailableAction.FETCH_MATCHES_LIST_SUCCESS;
      payload: Match[];
    }
  | {
      type: MatchesListAvailableAction.FETCH_MATCHES_LIST_FAILURE;
      payload: string;
    }
  | {
      type: MatchesListAvailableAction.REFRESH_MATCH_SUCCESS;
      payload: Match[];
    };

export type MatchDispatch = React.Dispatch<MatchActions>;
