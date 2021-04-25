import React, { useState, useEffect, useRef } from "react";
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

const Apply = (props) => {
  const history = useHistory();
  const { jobId } = useParams();
  const [applying, setApplying] = useState(false);
  const [data, setData] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [skillsFromServer, setSkillsFromServer] = useState([]);

  const userAnswerGrades = (answer) =>
    answer.reduce((acc, item) => (acc += Number(item.weightage)), 0);
  const userAnswerGradesTotal = (questionsArray) => {
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
  const getSkillsGrade = (userSkills, requiredSkills) => {
    const filteredData = requiredSkills.filter(
      (item) =>
        userSkills.indexOf(item) > -1 ||
        userSkills.filter(
          (it) => item.indexOf(it) > -1 || it.indexOf(item) > -1
        ).length
    );
    console.log(filteredData, userSkills, requiredSkills);
    return filteredData.length * 100;
  };
  const onSubmit = async (values) => {
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
    console.log(values.skills);
    skillsGrade = Math.round(
      getSkillsGrade(
        [...values.skills, ...skillsFromServer].filter(
          (item) =>
            item &&
            (data.skills.indexOf(item) > -1 ||
              data.skills.filter((it) => it.toLowerCase().indexOf(item) > -1)
                .length)
        ).map(item => item.toLowerCase()),
        data.skills.map((item) => item.toLowerCase())
      ) / data.skills.length
    );
    // skillsGrade =
    experienceGrade =
      Number(values.experience) > Number(data.minimumExperience)
        ? 100
        : Math.round(
            (Number(values.experience) * 100) / Number(data.minimumExperience)
          );
    // console.log({
    //   skills: [...values.skills, ...skillsFromServer].filter(
    //     (item) =>
    //       item &&
    //       item != " " &&
    //       (data.skills.indexOf(item) > -1 ||
    //         data.skills.filter((it) => it.toLowerCase().indexOf(item) > -1)
    //           .length)
    //   ),
    // });
    // return;
    try {
      const res = await https.post("/application/apply", {
        ...values,
        aptitudeGrade,
        personalityGrade,
        skillsGrade,
        experienceGrade,
        job: jobId,
      });
      if (res.data) {
        console.log(res.data);
        history.goBack();
      }
    } catch (error) {
    } finally {
    }
  };

  const [uploading, setUploading] = useState(false);
  const uploadRef = useRef(null);
  const formRef = useRef(null);
  const upload = async (event) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      const res = await https.post("/global/upload", formData, config);
      if (res.data) {
        console.log(res.data);
        formRef.current.setFieldValue("resume", res.data.fileUrl);
        formRef.current.setFieldValue(
          "email",
          res.data.resumeDetailsFromExpress?.email ||
            res.data.resumeDetailsFromFlask?.email ||
            ""
        );
        formRef.current.setFieldValue(
          "experience",
          res.data.resumeDetailsFromFlask?.total_exp || ""
        );
        let d =
          mergeSkills(res.data.resumeDetailsFromExpress) +
          mergeSkills({
            ...res.data.resumeDetailsFromFlask,
            designition: res.data.resumeDetailsFromFlask.designition.join(" "),
            skills: res.data.resumeDetailsFromFlask.skills.join(" "),
          });
        console.log(d);
        setSkillsFromServer(
          d
            .toLowerCase()
            .replace("\n", " ")
            .replace("/", " ")
            .split(" ")
            .filter((item) => {
              const letters = [
                "an",
                "the",
                "act",
                "hello",
                "it",
                "no",
                "on",
                "this",
                "that",
                "from",
                "to",
                "in",
                "into",
                "with",
                "for",
                "let",
                "along",
                "months",
                "within",
                "year",
                "month",
                "day",
                "date",
                "and",
                "dues",
                "payments",
                "make",
                "rs.",
                "like",
                "using",
                "field",
                "ce",
                ...getAlphabets(),
              ];
              return letters.indexOf(item) > -1 ? false : true;
            })
        );
      }
    } catch (error) {
    } finally {
      setUploading(false);
    }
  };
  const getAlphabets = () => {
    const alpha = Array.from(Array(26)).map((e, i) => i + 97);
    const alphabets = alpha.map((x) => {
      let alphabet = String.fromCharCode(x);
      return alphabet == "r" ? "" : alphabet;
    });
    return alphabets;
  };
  const filterObject = (obj, objArray, include, cb) => {
    try {
      let ret = include ? {} : Object.assign({}, obj);
      for (let i = 0; i < objArray.length; i++) {
        const key = objArray[i];
        if (obj[key] != undefined) {
          if (include) {
            ret[key] = obj[key];
          } else {
            delete ret[key];
          }
        }
      }
      if (cb) {
        return cb(ret);
      } else {
        return ret;
      }
    } catch (err) {
      console.log(err);
      return {};
    }
  };
  const mergeSkills = (data) => {
    const filtered = filterObject(
      data,
      [
        "name",
        "email",
        "education",
        "websites",
        "interests",
        "languages",
        "total_exp",
        "university",
        "Companies worked at",
        "degree",
        "phone",
      ],
      false
    );
    return Object.keys(filtered).reduce((acc, item) => (acc += data[item]), "");
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
          aptitudeQuestions: res.data.aptitudeQuestions.map((item) => {
            return { question: item.question, answer: "", weightage: 0 };
          }),
          personalityQuestions: res.data.personalityQuestions.map((item) => {
            return { question: item.question, answer: "", weightage: 0 };
          }),
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
        innerRef={formRef}
        enableReinitialize
        initialValues={{
          resume: "",
          email: "",
          experience: 0,
          location: "",
          skills: [],
          aptitudeQuestions: [],
          personalityQuestions: [],
          ...userAnswers,
        }}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {(formik) => {
          const {
            values,
            initialValues,
            touched,
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          } = formik;
          return (
            <div className="col-6 position-relative">
              <input
                type="file"
                ref={uploadRef}
                style={{ display: "none" }}
                accept="application/msword, application/vnd.ms-powerpoint,
                text/plain, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={upload}
              />

              <Input
                label="Resume"
                placeholder="Upload resume"
                value={values.resume || initialValues.resume}
                onChange={handleChange("resume")}
                onBlur={handleBlur("resume")}
                error={touched.resume && errors.resume}
                readOnly={true}
                required={true}
              />
              <button
                className="btn btn-secondary mb-4"
                onClick={() => uploadRef.current.click()}
              >
                Select
              </button>

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
                label="Your skills"
                placeholder="Click here to select or add..."
                value={values.skills || initialValues.skills}
                options={skills}
                onChange={(item) => {
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
