import React, { createContext, useContext, useReducer } from "react";
import { initialStatePreferences } from "./types";
import { PreferencessReducer } from "./reducer";
import { PreferencesListState, PreferencesDispatch } from "./types";

const PreferencesStateContext =
  createContext<PreferencesListState>(initialStatePreferences);

const PreferencessDispatchContext = createContext<PreferencesDispatch>(() => {});

export const PreferencesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(PreferencessReducer, initialStatePreferences);
  return (
    <PreferencesStateContext.Provider value={state}>
      <PreferencessDispatchContext.Provider value={dispatch}>
        {children}
      </PreferencessDispatchContext.Provider>
    </PreferencesStateContext.Provider>
  );
};

export const usePreferencesState = () => useContext(PreferencesStateContext);

export const usePreferencesDispatch = () => useContext(PreferencessDispatchContext);
