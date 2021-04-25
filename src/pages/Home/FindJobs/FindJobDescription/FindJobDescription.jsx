import React, { useState, useEffect } from "react";
import css from "./FindJobDescription.module.scss";
import { useHistory, useParams } from "react-router-dom";
import https from "../../../../services/https";

const FindJobDescription = (props) => {
  const history = useHistory();
  const { jobId } = useParams();
  const goToApply = () => history.push(jobId + "/apply");

  const [job, setJob] = useState(null);
  const [gettingJob, setGettingJob] = useState(false);
  const getJob = async () => {
    setGettingJob(true);
    try {
      const res = await https.get("/job/" + jobId);
      if (res.data) {
        console.log(res.data);
        setJob(res.data);
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
    <div className="row">
      {job ? (
        <>
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
                <h4 className="media-heading">{job?.title}</h4>
                {job?.location}
                <div className="mt-4">
                  <button
                    className="btn btn-primary"
                    disabled={job?.myApplication}
                    onClick={goToApply}
                  >
                    {job?.myApplication ? "Applied" : "Apply"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr className="col-12"></hr>
          <div className={css.description + " " + "col-12"}>
            {job?.description}
          </div>
        </>
      ) : (
        "No data"
      )}
    </div>
  );
};

export default FindJobDescription;
