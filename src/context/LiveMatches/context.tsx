import React, { createContext, useContext, useReducer } from "react";
import { initialStateMatches } from "./types";
import { matchReducer } from "./reducer";
import { MatchesListState, MatchDispatch } from "./types";

const MatchesStateContext =
  createContext<MatchesListState>(initialStateMatches);

const MatchesDispatchContext = createContext<MatchDispatch>(() => {});

export const MatchsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(matchReducer, initialStateMatches);
  return (
    <MatchesStateContext.Provider value={state}>
      <MatchesDispatchContext.Provider value={dispatch}>
        {children}
      </MatchesDispatchContext.Provider>
    </MatchesStateContext.Provider>
  );
};

export const useMatchesState = () => useContext(MatchesStateContext);

export const useMatchesDispatch = () => useContext(MatchesDispatchContext);
