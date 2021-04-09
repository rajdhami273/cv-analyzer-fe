import React from "react";
import css from "./FindJobDescription.module.scss";
import { useHistory } from "react-router-dom";

const FindJobDescription = props => {
  const history = useHistory();
  const goToDescription = () => history.push("find-jobs/apply/id");
  return (
    <div className="row">
      <div className="col-12">
        <div className={css.job + " " + "media"}>
          <div className="media-left mr-4">
            <a href="#">
              <img
                className="media-object"
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnMvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjEzLjQ2MDkzNzUiIHk9IjMyIiBzdHlsZT0iZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+NjR4NjQ8L3RleHQ+PC9nPjwvc3ZnPg=="
                alt="..."
              />
            </a>
          </div>
          <div className="media-body">
            <h4 className="media-heading">Software Developer</h4>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
            scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum
            in vulputate at, tempus viverra turpis.
            <div className="mt-4">
              <button className="btn btn-primary" onClick={goToDescription}>
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="col-12"></hr>
      <div className={css.description + " " + "col-12"}>Job description</div>
    </div>
  );
};

export default FindJobDescription;
