import React from "react";
import { useHistory } from "react-router";
import css from "./LandingPage.module.scss";

const LandingPage = (props) => {
  const history = useHistory();
  const goToLogin = () => history.push("/login");
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className="row vh-md-100">
          <div className="col-md-8 col-sm-10 col-12 mx-auto my-auto text-center">
            <h1 className={css.headingBlack + " " + css.textCapitalize}>
              CV Analyzer
            </h1>
            <p className={css.lead + " py-3"}>
              Simple yet effective tool to give you a proper insights on your CV
              as well as group of CVs. Compare where you stand or compare
              different users visually for finding that special one...
            </p>
            <button
              className="btn btn-primary d-inline-flex flex-row align-items-center"
              onClick={goToLogin}
            >
              Get started now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-arrow-right ml-2"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
