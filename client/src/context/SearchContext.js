import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  state: undefined,
  theatre: undefined,
  date: undefined,
  options: {
    ticket: undefined
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  return (
    <SearchContext.Provider
      value={{
        state: state.state,
        theatre: state.theatre,
        date: state.date,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
