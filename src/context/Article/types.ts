export const initialStateArticle: ArticleListState = {
  articles: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export interface ArticleListState {
  articles: Article[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
export interface Article {
  id: number;
  title: string;
  thumbnail: string;
  date: string;
  summary: string;
  content: string;
  teams: Team[];
  sport: Sport[];
}

export interface Team {
  id: number;
  plays: string;
  name: string;
}

export interface Sport {
  id: number;
  name: string;
}
export const initialStateSport: Sport = {
  id: 1,
  name: "Basketball",
};

export enum ArticleListAvailableAction {
  FETCH_ARTICLES_LIST_REQUEST = "FETCH_ARTICLES_LIST_REQUEST",
  FETCH_ARTICLES_LIST_SUCCESS = "FETCH_ARTICLES_LIST_SUCCESS",
  FETCH_ARTICLES_LIST_FAILURE = "FETCH_ARTICLES_LIST_FAILURE",
}

export type ArticleActions =
  | { type: ArticleListAvailableAction.FETCH_ARTICLES_LIST_REQUEST }
  | {
      type: ArticleListAvailableAction.FETCH_ARTICLES_LIST_SUCCESS;
      payload: Article[];
    }
  | {
      type: ArticleListAvailableAction.FETCH_ARTICLES_LIST_FAILURE;
      payload: string;
    };

export type ArticleDispatch = React.Dispatch<ArticleActions>;
