import React from "react";
import css from "./NoData.module.scss";

const NoData = ({ title, text }) => {
  return (
    <>
      <div className={`${css.blankState} ${css.blankStatelg}`}>
        <i className="mega-octicon octicon-organization"></i>
        <h2>{title || "Nothing here"}</h2>
        <p>{text || "No data to show!"}</p>
        {/* <button className="btn btn-default">Add a collaborator</button> */}
      </div>
    </>
  );
};

export default NoData;
