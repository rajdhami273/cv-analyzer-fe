import React from "react";
import css from "./MyApplicationDescription.module.scss";

const AllData = ({ userId, applications }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Experience</th>
            <th scope="col">Skills</th>
            <th scope="col">Aptitude</th>
            <th scope="col">Personality</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((item, index) => {
            return (
              <tr
                key={index}
                className={
                  userId == item.user
                    ? index < 3
                      ? "table-success"
                      : "table-danger"
                    : ""
                }
              >
                <th scope="row">{index + 1}</th>
                <td>{item.experienceGrade}%</td>
                <td>{item.skillsGrade}%</td>
                <td>{item.aptitudeGrade}%</td>
                <td>{item.personalityGrade}%</td>
                <td>{item.emailGrade}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllData;
