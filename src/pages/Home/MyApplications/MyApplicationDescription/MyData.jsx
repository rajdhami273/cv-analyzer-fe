import React from "react";
import css from "./MyApplicationDescription.module.scss";

const MyData = props => {
  const qAndAView = (question, answer) => (
    <div className="pt-2">
      <div className="pt-2 h5">
        <b>Q. {question}</b>
      </div>
      <div className="pt-0" id="options">
        {" "}
        <label className="options">
          <strong>Ans.</strong> {answer}
        </label>{" "}
      </div>
    </div>
  );
  return (
    <div className="row">
      <div className="col-12">
        {qAndAView("Experience", 2)}
        {qAndAView("Experience", 2)}
      </div>
    </div>
  );
};

export default MyData;
