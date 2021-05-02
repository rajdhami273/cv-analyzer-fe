import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import https from "../../../services/https";
import css from "./Dashboard.module.scss";

const Employer = () => {
  const history = useHistory();
  const goToDescription = (jobId) => history.push("find-jobs/" + jobId);

  const [getting, setGetting] = useState(false);
  const [jobsAndApplications, setJobsAndApplications] = useState({
    _id: null,
    totalJobs: 0,
    totalApplications: 0,
  });
  const getJobsAndApplications = async () => {
    setGetting(true);
    try {
      const res = await https.get("/user/job-and-applications");
      if (res.data) {
        console.log(res.data);
        setJobsAndApplications(res.data);
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

  useEffect(() => {
    getJobsAndApplications();
  }, []);
  return (
    <div className="row justify-content-center">
      <div className="col-4">
        <div className="card h-100 bg-light mb-3">
          <div className="card-header">Jobs Created</div>
          <div className="card-body">
            <h5 className="card-title">{jobsAndApplications.totalJobs}</h5>
            <p className="card-text">Jobs you have posted</p>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="card h-100 bg-light mb-3">
          <div className="card-header">Applications</div>
          <div className="card-body">
            <h5 className="card-title">
              {jobsAndApplications.totalApplications}
            </h5>
            <p className="card-text">Total applications received</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employer;
