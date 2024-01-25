import React, { createContext, useContext, useReducer } from "react";
import { initialStateArticle } from "./types";
import { articlesReducer } from "./reducer";
import { ArticleListState, ArticleDispatch } from "./types";

const ArticlesStateContext =
  createContext<ArticleListState>(initialStateArticle);

const ArticlesDispatchContext = createContext<ArticleDispatch>(() => {});

export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(articlesReducer, initialStateArticle);
  return (
    <ArticlesStateContext.Provider value={state}>
      <ArticlesDispatchContext.Provider value={dispatch}>
        {children}
      </ArticlesDispatchContext.Provider>
    </ArticlesStateContext.Provider>
  );
};

export const useArticlesState = () => useContext(ArticlesStateContext);

export const useArticlesDispatch = () => useContext(ArticlesDispatchContext);
