import React from "react";
import css from "./Apply.module.scss";
import Select from "../../../../components/Select/Select";
import RadioGroup from "../../../../components/RadioGroup/RadioGroup";

const UserAnswers = ({
  sectionName,
  sectionKey,
  setUserAnswers,
  data,
  userAnswers
}) => {
  const setAnswer = (answer, index) => {
    let obj = { ...userAnswers };
    let weightage = data[sectionKey][index].options.reduce((acc, item) => {
      if (item.title == answer) {
        acc += Number(item.weightage);
      }
      return acc;
    }, 0);
    obj[sectionKey][index].answer = answer;
    obj[sectionKey][index].weightage = weightage;
    setUserAnswers(obj);
  };
  return (
    <>
      <h5 className="mt-4">{sectionName} questions</h5>
      {data[sectionKey].map((item, index) => {
        const { inputType, options, question } = item;
        return (
          <div key={index}>
            {inputType == "select" && (
              <Select
                label={question}
                options={options}
                value={userAnswers[sectionKey][index].answer}
                titleKey="title"
                valueKey="title"
                onChange={answer => setAnswer(answer, index)}
                onBlur={() => {}}
              />
            )}{" "}
            {inputType == "radio" && (
              <RadioGroup
                label={question}
                name={"option" + index}
                options={options}
                value={userAnswers[sectionKey][index].answer}
                titleKey="title"
                valueKey="title"
                onChange={answer => setAnswer(answer, index)}
                onBlur={() => {}}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

export default UserAnswers;
