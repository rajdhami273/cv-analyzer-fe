import React from "react";
import css from "./MyApplicationDescription.module.scss";

const MyData = ({ application }) => {
  console.log(application);
  const qAndAView = (question, answer) => (
    <div className="pt-2">
      <div className="pt-2 h5">
        <span>Q. {question}</span>
      </div>
      <div className="pt-0" id="options">
        {" "}
        <label className="options">
          <strong>Ans.</strong> {answer}
        </label>{" "}
      </div>{" "}
    </div>
  );
  const headingAndValue = (heading, value) => (
    <div className="col-4">
      <div className="pt-2">
        <div className="pt-2 h5">
          <span>{heading}</span>
        </div>
        <div className="pt-0" id="options">
          <label className="options">
            <strong>{value}</strong>
          </label>{" "}
        </div>{" "}
      </div>
    </div>
  );
  return (
    <div className="row">
      {headingAndValue("Email", application.email)}
      {headingAndValue("Experience", application.experience)}
      {headingAndValue("Skills", application.skills?.join(",") || "N/A")}
      <div className="col-12">
        <h3>Aptitude Section</h3>
        {application.aptitudeQuestions?.map((item, index) => {
          const { question, answer } = item;
          return qAndAView(question, answer);
        })}
      </div>
      <div className="col-12">
        <h3>Personality Section</h3>
        {application.personalityQuestions?.map((item, index) => {
          const { question, answer } = item;
          return qAndAView(question, answer);
        })}
      </div>
    </div>
  );
};

export default MyData;
