import React, { useRef, useState, useContext } from "react";
import css from "./CreateJob.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../../../components/Input/Input";
import MultiSelect from "../../../components/MultiSelect/MultiSelect";
import Select from "../../../components/Select/Select";
import https from "../../../services/https";
import { AppContext } from "../../../AppProvider";
import Questions from "./Questions";
import { skills } from "../../../core/static/skills";
const CreateJob = props => {
  const { userDetails } = useContext(AppContext);
  const formRef = useRef(null);
  const [options, setOptions] = useState([]);
  const [aptitudeQuestions, setAptitudeQuestions] = useState([]);
  const [personalityQuestions, setPersonalityQuestions] = useState([]);

  const [creating, setCreating] = useState(false);
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .label("Title")
      .required("Title required"), //Yup.string().required("Username or email required"),
    description: Yup.string()
      .label("Description")
      .required("Description required"),
    location: Yup.string()
      .label("Location")
      .required(),
    minimumExperience: Yup.number()
      .label("Minimum Experience")
      .required(),
    skills: Yup.array()
      .label("Skills")
      .required()
      .min(1, "Minimum one required")
    // rememberMe: Yup.boolean().label("rememberMe")
    // .checkboxChecked("")
  });
  const createJob = async values => {
    setCreating(true);
    try {
      const res = await https.post("/job", {
        ...values,
        aptitudeQuestions,
        personalityQuestions,
        user: userDetails._id
      });
      if (res.data) {
        console.log(res.data);
        formRef.current.resetForm();
        setAptitudeQuestions([]);
        setPersonalityQuestions([]);
      }
    } catch (error) {
      if (error.response) {
        // setErrorMessage(error.response.data.message);
      } else {
        // setErrorMessage(error.message);
      }
    } finally {
      setCreating(!true);
    }
  };
  return (
    <div className="row justify-content-center position-relative">
      {
        <Formik
          innerRef={formRef}
          enableReinitialize
          initialValues={{
            title: "",
            description: "",
            location: "",
            minimumExperience: 0,
            skills: []
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log(values, aptitudeQuestions, personalityQuestions);
            createJob(values);
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
                <div className="col-6 position-relative">
                  <Input
                    label="Title"
                    placeholder="Enter title"
                    value={values.title || initialValues.title}
                    onChange={handleChange("title")}
                    onBlur={handleBlur("title")}
                    error={touched.title && errors.title}
                  />
                  <Input
                    label="Description"
                    placeholder="Enter description"
                    value={values.description || initialValues.description}
                    onChange={handleChange("description")}
                    onBlur={handleBlur("description")}
                    error={touched.description && errors.description}
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
                    // saveNewOptionFunction={option =>
                    //   setOptions([...options, option])
                    // }
                    required={true}
                  />
                </div>
                <div className="col-12 my-2"></div>
                <div className="col-6">
                  <Questions
                    sectionName="Aptitude"
                    questionsArray={aptitudeQuestions}
                    setQuestionsArray={setAptitudeQuestions}
                  />
                </div>
                <div className="col-12 my-2"></div>
                <div className="col-6">
                  <Questions
                    sectionName="Personality"
                    questionsArray={personalityQuestions}
                    setQuestionsArray={setPersonalityQuestions}
                  />
                </div>
                <div className="col-12 my-4"></div>
                <button className="btn btn-primary w-50" onClick={handleSubmit}>
                  {creating ? (
                    <span
                      className="spinner-border spinner-border-sm mr-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : null}
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
