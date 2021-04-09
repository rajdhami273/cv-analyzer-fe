import React, { useState } from "react";
import css from "./CreateJob.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../../../components/Input/Input";
import MultiSelect from "../../../components/MultiSelect/MultiSelect";
import Select from "../../../components/Select/Select";
const CreateJob = props => {
  const [options, setOptions] = useState([]);
  const [aptitudeQuestions, setAptitudeQuestions] = useState([]);
  const [personalityQuestions, setPersonalityQuestions] = useState([]);
  return (
    <div className="row justify-content-center">
      {
        <Formik
          enableReinitialize
          initialValues={{
            title: "",
            location: "",
            minimumExperience: 0,
            skills: []
          }}
          onSubmit={values => {
            console.log(values, aptitudeQuestions, personalityQuestions);
          }}
        >
          {formik => {
            const {
              handleChange,
              handleBlur,
              initialValues,
              values,
              touched,
              errors,
              setFieldValue,
              handleSubmit
            } = formik;
            return (
              <>
                <div className="col-6">
                  <Input
                    label="Title"
                    placeholder="Enter title"
                    value={values.title || initialValues.title}
                    onChange={handleChange("title")}
                    onBlur={handleBlur("title")}
                    error={touched.title && errors.title}
                  />
                  <Input
                    label="Location"
                    placeholder="Enter location"
                    value={values.location || initialValues.location}
                    onChange={handleChange("location")}
                    onBlur={handleBlur("location")}
                    error={touched.location && errors.location}
                  />
                  <Input
                    label="Minimum Experience (in years)"
                    placeholder="Enter minimum experience"
                    type="number"
                    value={
                      values.minimumExperience ||
                      initialValues.minimumExperience
                    }
                    onChange={handleChange("minimumExperience")}
                    onBlur={handleBlur("minimumExperience")}
                    error={
                      touched.minimumExperience && errors.minimumExperience
                    }
                  />
                  <MultiSelect
                    label="Required Skills"
                    placeholder="Click here to select or add..."
                    value={values.skills || initialValues.skills}
                    options={options}
                    onChange={item => {
                      let arr = [...values.skills];
                      const isSelected = arr.indexOf(item);
                      if (isSelected > -1) {
                        arr.splice(isSelected, 1);
                      } else {
                        arr.push(item);
                      }
                      setFieldValue("skills", arr);
                      // handleChange("softwaresUsed")(arr);
                    }}
                    onBlur={handleBlur("skills")}
                    error={touched.skills && errors.skills}
                    readOnly
                    addOptionWithSearch
                    showSearchBar
                    saveNewOption
                    saveNewOptionFunction={option =>
                      setOptions([...options, option])
                    }
                  />
                </div>
                <div className="col-12 my-2"></div>
                <div className="col-6">
                  <h3>Aptitude questions set</h3>
                  {aptitudeQuestions.map((item, index) => {
                    let { inputType, question, options } = item;
                    return (
                      <div key={index}>
                        <Select
                          label="Select input type"
                          options={["select", "radio"]}
                          value={inputType || ""}
                          onChange={val => {
                            let arr = [...aptitudeQuestions];
                            arr[index].inputType = val;
                            setAptitudeQuestions(arr);
                          }}
                          onBlur={() => {}}
                        />
                        <Input
                          label="Enter question"
                          value={question}
                          onBlur={() => {}}
                          onChange={event => {
                            let arr = [...aptitudeQuestions];
                            let val = event.target.value;
                            arr[index].question = val;
                            setAptitudeQuestions(arr);
                          }}
                        />
                        {/* <Input
                          label="Enter label"
                          value={label}
                          onBlur={() => {}}
                          onChange={event => {
                            let arr = [...aptitudeQuestions];
                            let val = event.target.value;
                            arr[index].label = val;
                            setAptitudeQuestions(arr);
                          }}
                        />
                        <Input
                          label="Enter placeholder"
                          value={placeholder}
                          onBlur={() => {}}
                          onChange={event => {
                            let arr = [...aptitudeQuestions];
                            let val = event.target.value;
                            arr[index].placeholder = val;
                            setAptitudeQuestions(arr);
                          }}
                        /> */}
                        {options.map((itm, idx) => {
                          const { title, weightage } = itm;
                          return (
                            <div key={index + "" + idx}>
                              <Input
                                label="Enter title"
                                value={title}
                                onBlur={() => {}}
                                onChange={event => {
                                  let arr = [...aptitudeQuestions];
                                  let val = event.target.value;
                                  arr[index].options[idx].title = val;
                                  setAptitudeQuestions(arr);
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
                                  let arr = [...aptitudeQuestions];
                                  let val = event.target.value;
                                  arr[index].options[idx].weightage = val;
                                  setAptitudeQuestions(arr);
                                }}
                              />
                            </div>
                          );
                        })}
                        <button
                          className="btn btn-secondary my-1 btn-sm"
                          onClick={() => {
                            options.push({
                              title: "",
                              weightage: 0
                            });
                            let arr = [...aptitudeQuestions];
                            arr[index].options = options;
                            setAptitudeQuestions(arr);
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
                      let arr = [...aptitudeQuestions];
                      arr.push({
                        inputType: "",
                        question: "",
                        options: []
                      });
                      setAptitudeQuestions(arr);
                    }}
                  >
                    Add question
                  </button>
                </div>
                <div className="col-12 my-2"></div>
                <div className="col-6">
                  <h3>Personality questions set</h3>
                  {personalityQuestions.map((item, index) => {
                    let { inputType, question, options } = item;
                    return (
                      <div>
                        <Select
                          label="Select input type"
                          options={["select", "radio"]}
                          value={inputType || ""}
                          onChange={val => {
                            let arr = [...personalityQuestions];
                            arr[index].inputType = val;
                            personalityQuestions(arr);
                          }}
                          onBlur={() => {}}
                        />
                        <Input
                          label="Enter question"
                          value={question}
                          onBlur={() => {}}
                          onChange={event => {
                            let arr = [...personalityQuestions];
                            let val = event.target.value;
                            arr[index].question = val;
                            personalityQuestions(arr);
                          }}
                        />
                        {/* <Input
                          label="Enter label"
                          value={label}
                          onBlur={() => {}}
                          onChange={event => {
                            let arr = [...personalityQuestions];
                            let val = event.target.value;
                            arr[index].label = val;
                            personalityQuestions(arr);
                          }}
                        />
                        <Input
                          label="Enter placeholder"
                          value={label}
                          onBlur={() => {}}
                          onChange={event => {
                            let arr = [...personalityQuestions];
                            let val = event.target.value;
                            arr[index].placeholder = val;
                            personalityQuestions(arr);
                          }}
                        /> */}
                        {options.map((itm, idx) => {
                          const { title, weightage } = itm;
                          return (
                            <>
                              <Input
                                label="Enter title"
                                value={title}
                                onBlur={() => {}}
                                onChange={event => {
                                  let arr = [...personalityQuestions];
                                  let val = event.target.value;
                                  arr[index].options[idx].title = val;
                                  personalityQuestions(arr);
                                }}
                              />
                              <Input
                                label="Enter weightage"
                                value={weightage}
                                type="number"
                                onBlur={() => {}}
                                onChange={event => {
                                  let arr = [...personalityQuestions];
                                  let val = event.target.value;
                                  arr[index].options[idx].title = val;
                                  personalityQuestions(arr);
                                }}
                              />
                            </>
                          );
                        })}
                        <button
                          className="btn btn-secondary my-1 btn-sm"
                          onClick={() => {
                            options.push({
                              title: "",
                              weightage: 0
                            });
                            let arr = [...personalityQuestions];
                            arr[index].options = options;
                            personalityQuestions(arr);
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
                      let arr = [...personalityQuestions];
                      arr.push({
                        inputType: "",
                        question: "",
                        options: []
                      });
                      personalityQuestions(arr);
                    }}
                  >
                    Add question
                  </button>
                </div>
                <div className="col-12 my-4"></div>
                <button className="btn btn-primary w-50" onClick={handleSubmit}>
                  Post
                </button>
              </>
            );
          }}
        </Formik>
      }
    </div>
  );
};

export default CreateJob;
