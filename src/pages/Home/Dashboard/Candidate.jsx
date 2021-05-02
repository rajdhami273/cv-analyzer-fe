import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import https from "../../../services/https";
import css from "./Dashboard.module.scss";

const Candidate = () => {
  const history = useHistory();
  const goToDescription = (jobId) => history.push("find-jobs/" + jobId);

  const [getting, setGetting] = useState(false);
  const [emailGrade, setEmailGrade] = useState({
    message: "Getting...",
    score: 0,
  });
  const getEmailGrade = async () => {
    setGetting(true);
    try {
      const res = await https.get("/user/email-grade");
      if (res.data) {
        console.log(res.data);
        setEmailGrade(res.data.emailGrade);
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

  const [aggregateGrades, setAggregateGrades] = useState({
    _id: null,
    total: 1,
    aptitudeGrade: 1,
    personalityGrade: 1,
    skillsGrade: 1,
    experienceGrade: 1,
  });
  const getAggregateGrades = async () => {
    setGetting(true);
    try {
      const res = await https.get("/user/get-aggregate-grade");
      if (res.data) {
        console.log(res.data);
        setAggregateGrades(res.data);
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
    getEmailGrade();
    getAggregateGrades();
  }, []);
  return (
    <div className="row justify-content-center">
      <div className="col-4 mb-4">
        <div
          className={`card h-100 bg-${
            emailGrade.score >= 75
              ? "success text-light"
              : emailGrade.score >= 50
              ? "light"
              : emailGrade.score >= 25
              ? "warning"
              : "danger text-light"
          } mb-3`}
        >
          <div className="card-header">Email Score</div>
          <div className="card-body">
            <h5 className="card-title">{emailGrade.score}%</h5>
            <p className="card-text">{emailGrade.message}</p>
          </div>
        </div>
      </div>
      <div className="col-4 mb-4">
        <div
          className={`card h-100 bg-${
            (aggregateGrades.aptitudeGrade * 100) / aggregateGrades.total >= 75
              ? "success text-light"
              : (aggregateGrades.aptitudeGrade * 100) / aggregateGrades.total >=
                50
              ? "light"
              : (aggregateGrades.aptitudeGrade * 100) / aggregateGrades.total >=
                25
              ? "warning"
              : "danger text-light"
          } mb-3`}
        >
          <div className="card-header">Aptitude Score</div>
          <div className="card-body">
            <h5 className="card-title">
              {(aggregateGrades.aptitudeGrade * 100) / aggregateGrades.total}%
            </h5>
            {/* <p className="card-text">{emailGrade.message}</p> */}
          </div>
        </div>
      </div>
      <div className="col-4 mb-4">
        <div
          className={`card h-100 bg-${
            (aggregateGrades.personalityGrade * 100) / aggregateGrades.total >=
            75
              ? "success text-light"
              : (aggregateGrades.personalityGrade * 100) /
                  aggregateGrades.total >=
                50
              ? "light"
              : (aggregateGrades.personalityGrade * 100) /
                  aggregateGrades.total >=
                25
              ? "warning"
              : "danger text-light"
          } mb-3`}
        >
          <div className="card-header">Personality Score</div>
          <div className="card-body">
            <h5 className="card-title">
              {(aggregateGrades.personalityGrade * 100) / aggregateGrades.total}
              %
            </h5>
            {/* <p className="card-text">{emailGrade.message}</p> */}
          </div>
        </div>
      </div>
      <div className="col-4 mb-4">
        <div
          className={`card h-100 bg-${
            (aggregateGrades.skillsGrade * 100) / aggregateGrades.total >= 75
              ? "success text-light"
              : (aggregateGrades.skillsGrade * 100) / aggregateGrades.total >=
                50
              ? "light"
              : (aggregateGrades.skillsGrade * 100) / aggregateGrades.total >=
                25
              ? "warning"
              : "danger text-light"
          } mb-3`}
        >
          <div className="card-header">Skills Score</div>
          <div className="card-body">
            <h5 className="card-title">
              {(aggregateGrades.skillsGrade * 100) / aggregateGrades.total}%
            </h5>
            {/* <p className="card-text">{emailGrade.message}</p> */}
          </div>
        </div>
      </div>
      <div className="col-4 mb-4">
        <div
          className={`card h-100 bg-${
            (aggregateGrades.experienceGrade * 100) / aggregateGrades.total >=
            75
              ? "success text-light"
              : (aggregateGrades.experienceGrade * 100) /
                  aggregateGrades.total >=
                50
              ? "light"
              : (aggregateGrades.experienceGrade * 100) /
                  aggregateGrades.total >=
                25
              ? "warning"
              : "danger text-light"
          } mb-3`}
        >
          <div className="card-header">Experience Score</div>
          <div className="card-body">
            <h5 className="card-title">
              {(aggregateGrades.experienceGrade * 100) / aggregateGrades.total}%
            </h5>
            {/* <p className="card-text">{emailGrade.message}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidate;
