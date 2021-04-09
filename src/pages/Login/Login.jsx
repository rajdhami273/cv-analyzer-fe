import React from "react";
import { useHistory } from "react-router";
// import css from "./Login.scss";

export default function Login() {
  const history = useHistory();
  const goToHome = () => history.push("/home");
  return (
    <div className="row justify-content-center align-items-center vh-100">
      <div className="col-md-6 contents">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="mb-4">
              <h3>Sign In</h3>
              <p className="mb-4"></p>
            </div>
            <form>
              <div className="form-group first">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" />
              </div>
              <div className="form-group last mb-4">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" />
              </div>
              {/* <div className="d-flex mb-5 align-items-center">
                <label className="control control--checkbox mb-0">
                  <span className="caption">Remember me</span>
                  <input type="checkbox" checked="checked" />
                  <div className="control__indicator"></div>
                </label>
                <span className="ml-auto">
                  <a href="#" className="forgot-pass">
                    Forgot Password
                  </a>
                </span>
              </div> */}
              <input
                type="submit"
                value="Log In"
                onClick={goToHome}
                className="btn text-white btn-block btn-primary"
              />
              {/* <span className="d-block text-left my-4 text-muted">
                {" "}
                or sign in with
              </span>
              <div className="social-login">
                <a href="#" className="facebook">
                  <span className="icon-facebook mr-3"></span>
                </a>
                <a href="#" className="twitter">
                  <span className="icon-twitter mr-3"></span>
                </a>
                <a href="#" className="google">
                  <span className="icon-google mr-3"></span>
                </a>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
