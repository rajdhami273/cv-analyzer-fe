import React, { useContext } from "react";
import css from "./ProfileType.module.scss";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../AppProvider";

const ProfileType = (props) => {
  const { setUserTypeFunc } = useContext(AppContext);
  const history = useHistory();
  const goToLogin = (userType) => {
    setUserTypeFunc(userType);
    history.push("/login");
  };
  return (
    <div className={" vw-100 " + " " + css.container}>
      <div className="row vh-100 align-items-center justify-content-center">
        <div className="col-4">
          <div
            className={css.profilecard6}
            onClick={() => goToLogin("candidate")}
          >
            <img src="" className="img img-responsive" />
            <div className={css.profilename}>Candidate</div>
            <div className={css.profileposition}>Lorem Ipsum Donor</div>
            <div className={css.profileoverview}>
              <div className="row text-center">
                <div className="col-12">
                  <h3>Wanna grow your career?</h3>
                  <p>Click here!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div
            className={css.profilecard6}
            onClick={() => goToLogin("employer")}
          >
            <img src="" className="img img-responsive" />
            <div className={css.profilename}>Employer</div>
            <div className={css.profileposition}>Lorem Ipsum Donor</div>
            <div className={css.profileoverview}>
              <div className="row text-center">
                <div className="col-12">
                  <h3>Wanna grow your company?</h3>
                  <p>Click here!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileType;
