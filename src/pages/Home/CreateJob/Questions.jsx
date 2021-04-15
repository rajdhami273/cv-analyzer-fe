import React from "react";
import css from "./CreateJob.module.scss";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";

export default function Questions({
  sectionName,
  questionsArray,
  setQuestionsArray
}) {
  return (
    <>
      <h3>{sectionName} questions set</h3>
      {questionsArray.map((item, index) => {
        let { inputType, question, options } = item;
        return (
          <div key={index}>
            <div className="d-flex w-100 justify-content-between">
              <h5>Question {index + 1}</h5>
              <a
                // href="javascript:void(0)"
                href=""
                onClick={e => {
                  e.preventDefault();
                  let arr = [...questionsArray];
                  arr.splice(index, 1);
                  setQuestionsArray(arr);
                }}
              >
                Remove
              </a>
            </div>
            <Select
              label="Select input type"
              options={["select", "radio"]}
              value={inputType || ""}
              onChange={val => {
                let arr = [...questionsArray];
                arr[index].inputType = val;
                setQuestionsArray(arr);
              }}
              onBlur={() => {}}
            />
            <Input
              label="Enter question"
              value={question}
              onBlur={() => {}}
              onChange={event => {
                let arr = [...questionsArray];
                let val = event.target.value;
                arr[index].question = val;
                setQuestionsArray(arr);
              }}
            />
            <div className="pl-4">
              {options.map((itm, idx) => {
                const { title, weightage } = itm;
                return (
                  <div key={index + "" + idx}>
                    <div className="d-flex w-100 justify-content-between">
                      <h6>Option {idx + 1}</h6>
                      <a
                        href=""
                        onClick={e => {
                          e.preventDefault();
                          let arr = [...questionsArray];
                          arr[index].options.splice(idx, 1);
                          setQuestionsArray(arr);
                        }}
                      >
                        Remove
                      </a>
                    </div>
                    <Input
                      label="Enter title"
                      value={title}
                      onBlur={() => {}}
                      onChange={event => {
                        let arr = [...questionsArray];
                        let val = event.target.value;
                        arr[index].options[idx].title = val;
                        setQuestionsArray(arr);
                        // let optionsTemp = [...options];
                        // optionsTemp[idx].title = title;
                        // let
                      }}
                    />
                    <Input
                      label="Enter weightage"
                      value={weightage}
                      type="number"
                      onBlur={() => {}}
                      onChange={event => {
                        let arr = [...questionsArray];
                        let val = event.target.value;
                        arr[index].options[idx].weightage = val;
                        setQuestionsArray(arr);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <button
              className="btn btn-secondary my-1 btn-sm"
              onClick={() => {
                options.push({
                  title: "",
                  weightage: 0
                });
                let arr = [...questionsArray];
                arr[index].options = options;
                setQuestionsArray(arr);
              }}
            >
              Add options
            </button>
          </div>
        );
      })}
      <button
        className="btn btn-secondary my-1"
        onClick={() => {
          let arr = [...questionsArray];
          arr.push({
            inputType: "",
            question: "",
            options: []
          });
          setQuestionsArray(arr);
        }}
      >
        Add question
      </button>
    </>
  );
}
