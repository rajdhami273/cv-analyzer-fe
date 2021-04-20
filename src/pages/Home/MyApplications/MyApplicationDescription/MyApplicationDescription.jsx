import React, { useState, useEffect } from "react";
import css from "./MyApplicationDescription.module.scss";
import { useParams, useHistory } from "react-router-dom";
import https from "../../../../services/https";
import MyData from "./MyData";
import AllData from "./AllData";

const MyApplicationDescription = props => {
  const history = useHistory();
  const { applicationId } = useParams();
  //   const goToDescription = applicationId =>
  //     history.push("my-applications/" + applicationId);

  const [getting, setGetting] = useState(false);
  const [application, setApplication] = useState([]);
  const [applications, setApplications] = useState([]);
  const getApplication = async () => {
    setGetting(true);
    try {
      const res = await https.get("/application/" + applicationId);
      if (res.data) {
        console.log(res.data);
        setApplication(res.data);
        getApplications(res.data.job)
      }
    } catch (error) {
      if (error.response) {
        // setErrorMessage(error.response.data.message);
      } else {
        // setErrorMessage(error.message);
      }
    } finally {
      setGetting(!true);
    }
  };

  const getApplications = async(jobId) => {
    setGetting(true);
    try {
      const res = await https.get("/application/for-job/"+jobId);
      if (res.data) {
        console.log(res.data);
        setApplications(res.data);
      }
    } catch (error) {
      if (error.response) {
        // setErrorMessage(error.response.data.message);
      } else {
        // setErrorMessage(error.message);
      }
    } finally {
      setGetting(!true);
    }
  }
  const [tab, setTab] = useState("my");
  const toggleTab = (e, tabType) => {
    e.preventDefault();
    setTab(tabType);
  };
  useEffect(() => {
    getApplication();
    // getApplications();
  }, []);
  return (
    <>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className={"nav-link " + (tab == "my" ? "active" : "")}
            id="home-tab"
            href=""
            role="tab"
            aria-controls="home"
            aria-selected="true"
            onClick={e => toggleTab(e, "my")}
          >
            My Application
          </a>
        </li>
        <li className="nav-item">
          <a
            className={"nav-link " + (tab == "all" ? "active" : "")}
            id="profile-tab"
            href=""
            role="tab"
            aria-controls="profile"
            aria-selected="false"
            onClick={e => toggleTab(e, "all")}
          >
            How I fare with others?
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className={"tab-pane fade " + (tab == "my" ? "show active" : "")}
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <MyData application={application} />
        </div>
        <div
          className={"tab-pane fade " + (tab == "all" ? "show active" : "")}
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <AllData applications={applications}/>
        </div>
      </div>
    </>
  );
};

export default MyApplicationDescription;
