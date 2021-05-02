import React from "react";
import css from "./MyApplicationDescription.module.scss";

const MyData = ({ application }) => {
  console.log(application);
  const qAndAView = (question, answer) => (
    <div className="pt-2">
      <div className="pt-2 h5">
        <span>Q. {question || "N/A"}</span>
      </div>
      <div className="pt-0" id="options">
        {" "}
        <label className="options">
          <strong>Ans.</strong> {answer || "N/A"}
        </label>{" "}
      </div>{" "}
    </div>
  );
  const headingAndValue = (heading, value) => (
    <div className="col-4">
      <div className="pt-2">
        <div className="pt-2 h5">
          <span>{heading || "N/A"}</span>
        </div>
        <div className="pt-0" id="options">
          <label className="options">
            <strong>{value || "N/A"}</strong>
          </label>{" "}
        </div>{" "}
      </div>
    </div>
  );
  return (
    <div className="row">
      {headingAndValue("Email", application?.email)}
      {headingAndValue("Experience", application?.experience)}
      {headingAndValue("Skills", application?.skills?.join(",") || "N/A")}
      {application?.aptitudeQuestions?.length ? (
        <div className="col-12">
          <h3>Aptitude Section</h3>
          {application?.aptitudeQuestions?.map((item, index) => {
            const { question, answer } = item;
            return <div key={index}>{qAndAView(question, answer)}</div>;
          })}
        </div>
      ) : null}
      {application?.personalityQuestions?.length ? (
        <div className="col-12">
          <h3>Personality Section</h3>
          {application?.personalityQuestions?.map((item, index) => {
            const { question, answer } = item;
            return <div key={index}>{qAndAView(question, answer)}</div>;
          })}
        </div>
      ) : null}
    </div>
  );
};

export default MyData;
