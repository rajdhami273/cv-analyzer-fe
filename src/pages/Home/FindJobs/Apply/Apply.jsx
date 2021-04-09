import React from "react";
import css from "./Apply.module.scss";
import Select from "../../../../components/Select/Select";

const Apply = props => {
  const data = {
    location: "as",
    minimumExperience: 1,
    skills: ["Reactjsd"],
    title: "asas",
    aptitudeQuestions: [
      {
        inputType: "radio",
        options: [
          { title: "Yes", weightage: "1" },
          { title: "No", weightage: "0" }
        ],
        question: "Are you smart?"
      },
      {
        inputType: "select",
        options: [
          { title: "Yes", weightage: "0" },
          { title: "No", weightage: "1" }
        ],
        question: "Are you dumb?"
      }
    ]
  };
  return (
    <>
      <input type="file" accept="*/.docx,.pdf" />
      {data.aptitudeQuestions.map((item, index) => {
        const { inputType, options, question } = item;
        return (
          <div key={index}>
            {inputType == "select" && (
              <Select options={options} titleKey="title" valueKey="weightage" />
            )}{" "}
            {inputType == "radio" && <input type="radio" />}
          </div>
        );
      })}
    </>
  );
};

export default Apply;
