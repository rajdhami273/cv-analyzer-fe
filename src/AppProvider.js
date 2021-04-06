import React from "react";
export const AppContext = React.createContext();

export default function AppProvider(props) {
  return <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>;
}
