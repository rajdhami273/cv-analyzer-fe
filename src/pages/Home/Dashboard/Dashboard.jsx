import React, { useContext } from "react";
import { AppContext } from "../../../AppProvider";
import Candidate from "./Candidate";
import css from "./Dashboard.module.scss";
import Employer from "./Employer";

const Dashboard = (props) => {
  const { userType } = useContext(AppContext);
  return userType == "candidate" ? <Candidate /> : <Employer />;
};

export default Dashboard;
