import React, { useState, useEffect } from "react";
import https from "./services/https";
export const AppContext = React.createContext();

export default function AppProvider(props) {
  const [userType, setUserType] = useState(
    localStorage.getItem("userType") || "candidate"
  );
  const [userDetails, setUserDetails] = useState({});

  function setUserTypeFunc(type) {
    setUserType(type);
    localStorage.setItem("userType", type);
  }
  function resetApp() {
    setUserDetails({});
    setUserType("candidate");
    localStorage.removeItem("authToken");
  }

  const getUserDetailsFromServer = async () => {
    try {
      const res = await https.get("/user/me");
      if (res.data) {
        // console.log("AppProvider", res.data);
        setUserDetails(res.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
      }
    } finally {
      // do something
    }
  };

  useEffect(() => {
    getUserDetailsFromServer();
  }, []);
  return (
    <AppContext.Provider
      value={{
        userType,
        setUserTypeFunc,
        userDetails,
        resetApp,
        getUserDetailsFromServer
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
