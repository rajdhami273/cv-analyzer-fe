import React from "react";
import css from "./MyApplicationDescription.module.scss";

const AllData = ({ applications }) => {
  return (
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Experience</th>
            <th scope="col">Skills</th>
            <th scope="col">Aptitude</th>
            <th scope="col">Personality</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.aptitudeGrade}%</td>
                <td>{item.personalityGrade}%</td>
                <td>{item.skillsGrade}%</td>
                <td>{item.experienceGrade}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllData;
