import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { AppContext } from "../../../../AppProvider";
import https from "../../../../services/https";
import ApplicantsUI from "./ApplicantsUI";
import css from "./MyCreatedJobDescription.module.scss";
import MyCreatedJobDescriptionUI from "./MyCreatedJobDescriptionUI";

const MyCreatedJobDescription = (props) => {
  const history = useHistory();
  const { jobId } = useParams();
  const { userType, userDetails } = useContext(AppContext);
  //   const goToDescription = applicationId =>
  //     history.push("my-applications/" + applicationId);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const [message, setMessage] = useState("");

  const [getting, setGetting] = useState(false);
  const [applications, setApplications] = useState([]);
  const getApplications = async (jobId) => {
    setGetting(true);
    try {
      const res = await https.get("/application/for-job/" + jobId);
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
  };
  const [job, setJob] = useState(null);
  const [gettingJob, setGettingJob] = useState(false);
  const getJob = async () => {
    setGettingJob(true);
    try {
      const res = await https.get("/job/" + jobId);
      if (res.data) {
        console.log(res.data);
        setJob(res.data);
        getApplications(res.data._id);
      }
    } catch (error) {
      if (error.response) {
        // setErrorMessage(error.response.data.message);
      } else {
        // setErrorMessage(error.message);
      }
    } finally {
      setGettingJob(false);
    }
  };

  const [sendingMessage, setSendingMessage] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);
  const sendMessage = async () => {
    setSendingMessage(true);
    try {
      const res = await https.post("/messenger", {
        messageDoc: { message: message },
        application: currentApplication._id,
        candidate: currentApplication.user,
        employer: userDetails._id,
        userType,
      });
      if (res.data) {
        console.log(res.data);
        setMessage("");
        // getAllMessagesInMessenger();
      }
    } catch (error) {
      if (error.response) {
        // setErrorMessage(error.response.data.message);
      } else {
        // setErrorMessage(error.message);
      }
      // toggleErrorPopup();
    } finally {
      setSendingMessage(false);
    }
  };
  const changeStatus = async (applicationId) => {
    setSendingMessage(true);
    try {
      const res = await https.put(
        "/application/change-status/" + applicationId,
        {
          status: "viewed",
        }
      );
      if (res.data) {
        console.log(res.data);
        setMessage("");
        // getAllMessagesInMessenger();
      }
    } catch (error) {
      if (error.response) {
        // setErrorMessage(error.response.data.message);
      } else {
        // setErrorMessage(error.message);
      }
      // toggleErrorPopup();
    } finally {
      setSendingMessage(false);
    }
  };
  const [tab, setTab] = useState("my");
  const toggleTab = (e, tabType) => {
    e.preventDefault();
    setTab(tabType);
  };
  useEffect(() => {
    getJob();
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
            onClick={(e) => toggleTab(e, "my")}
          >
            My Job Description
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
            onClick={(e) => toggleTab(e, "all")}
          >
            Applicants
          </a>
        </li>
      </ul>
      <div className="tab-content position-relative" id="myTabContent">
        <div
          className={"tab-pane py-4 fade " + (tab == "my" ? "show active" : "")}
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <MyCreatedJobDescriptionUI job={job} />
        </div>
        <div
          className={
            "tab-pane py-4 fade " + (tab == "all" ? "show active" : "")
          }
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <ApplicantsUI
            applications={applications}
            toggleModal={toggleModal}
            showModal={showModal}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            currentApplication={currentApplication}
            setCurrentApplication={setCurrentApplication}
            changeStatus={changeStatus}
          />
        </div>
      </div>
    </>
  );
};

export default MyCreatedJobDescription;
