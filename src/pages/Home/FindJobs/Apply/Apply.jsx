import React, { useState, useEffect } from "react";
import css from "./Apply.module.scss";
import Select from "../../../../components/Select/Select";
import RadioGroup from "../../../../components/RadioGroup/RadioGroup";
import Input from "../../../../components/Input/Input";
import { Formik } from "formik";
import * as Yup from "yup";
import MultiSelect from "../../../../components/MultiSelect/MultiSelect";
import { skills } from "../../../../core/static/skills";
import https from "../../../../services/https";
import { useHistory, useParams } from "react-router-dom";
import UserAnswers from "./UserAnswers";

const Apply = props => {
  const history = useHistory();
  const { jobId } = useParams();
  const [applying, setApplying] = useState(false);
  const [data, setData] = useState({});
  const [userAnswers, setUserAnswers] = useState({});

  const userAnswerGrades = answer =>
    answer.reduce((acc, item) => (acc += Number(item.weightage)), 0);
  const userAnswerGradesTotal = questionsArray => {
    let arr = [...questionsArray];
    let total = 0;
    for (let q of questionsArray) {
      total += q.options.reduce(
        (acc, item) => Math.max(Number(item.weightage), acc),
        0
      );
    }
    console.log(questionsArray, total);
    return total || 1;
  };
  const onSubmit = async values => {
    // console.log(values);
    let aptitudeGrade = 0,
      personalityGrade = 0,
      skillsGrade = 0,
      experienceGrade = 0;
    //For Aptitude grade
    aptitudeGrade = Math.round(
      Number(userAnswerGrades(values.aptitudeQuestions) * 100) /
        userAnswerGradesTotal(data.aptitudeQuestions)
    );
    //For Personality grade
    personalityGrade = Math.round(
      Number(userAnswerGrades(values.personalityQuestions) * 100) /
        userAnswerGradesTotal(data.personalityQuestions)
    );
    skillsGrade = Math.round(
      (values.skills.filter(item => data.skills.indexOf(item) > -1).length *
        100) /
        data.skills.length
    );
    experienceGrade =
      Number(values.experience) > Number(data.minimumExperience)
        ? 100
        : Math.round(
            (Number(values.experience) * 100) / Number(data.minimumExperience)
          );
    console.log({
      ...values,
      aptitudeGrade,
      personalityGrade,
      skillsGrade,
      experienceGrade
    });
    // return;
    try {
      const res = await https.post("/application/apply", {
        ...values,
        aptitudeGrade,
        personalityGrade,
        skillsGrade,
        experienceGrade,
        job: jobId
      });
      if (res.data) {
        console.log(res.data);
        history.goBack();
      }
    } catch (error) {
    } finally {
    }
  };

  const [job, setJob] = useState(null);
  const [gettingJob, setGettingJob] = useState(false);
  const getJob = async () => {
    setGettingJob(true);
    try {
      const res = await https.get("/job/" + jobId);
      if (res.data) {
        console.log(res.data);
        setJob(res.data);
        setData(res.data);
        setUserAnswers({
          aptitudeQuestions: res.data.aptitudeQuestions.map(item => {
            return { question: item.question, answer: "", weightage: 0 };
          }),
          personalityQuestions: res.data.personalityQuestions.map(item => {
            return { question: item.question, answer: "", weightage: 0 };
          })
        });
      }
    } catch (error) {
      if (error.response) {
        // setErrorMessage(error.response.data.message);
      } else {
        // setErrorMessage(error.message);
      }
    } finally {
      setGettingJob(false);
    }
  };

  useEffect(() => {
    getJob();
  }, []);

  return (
    <div className="row justify-content-center position-relative">
      <Formik
        enableReinitialize
        initialValues={{
          email: "",
          experience: 0,
          location: "",
          skills: [],
          aptitudeQuestions: [],
          personalityQuestions: [],
          ...userAnswers
        }}
        onSubmit={values => {
          onSubmit(values);
        }}
      >
        {formik => {
          const {
            values,
            initialValues,
            touched,
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue
          } = formik;
          return (
            <div className="col-6 position-relative">
              <input type="file" accept="*/.docx,.pdf" />
              <Input
                label="Email"
                placeholder="Enter email"
                value={values.email || initialValues.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                error={touched.email && errors.email}
                required={true}
              />
              <Input
                label="Experience"
                type="number"
                placeholder="Enter experince in years"
                value={values.experience || initialValues.experience}
                onChange={handleChange("experience")}
                onBlur={handleBlur("experience")}
                error={touched.experience && errors.experience}
                required={true}
              />
              <MultiSelect
                label="Required Skills"
                placeholder="Click here to select or add..."
                value={values.skills || initialValues.skills}
                options={skills}
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
                // addOptionWithSearch
                showSearchBar
                // saveNewOption
                // saveNewOptionFunction={() => {}}
                required={true}
              />
              {data.aptitudeQuestions && userAnswers.aptitudeQuestions && (
                <UserAnswers
                  sectionName="Aptitude"
                  sectionKey="aptitudeQuestions"
                  setUserAnswers={setUserAnswers}
                  data={data}
                  userAnswers={userAnswers}
                />
              )}
              {data.personalityQuestions &&
                userAnswers.personalityQuestions && (
                  <UserAnswers
                    sectionName="Personality"
                    sectionKey="personalityQuestions"
                    setUserAnswers={setUserAnswers}
                    data={data}
                    userAnswers={userAnswers}
                  />
                )}
              <button
                className="btn btn-primary w-100 my-4"
                onClick={handleSubmit}
              >
                {applying ? (
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : null}
                Apply
              </button>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Apply;
