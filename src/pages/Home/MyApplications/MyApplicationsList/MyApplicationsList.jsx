import React, { useState, useEffect } from "react";
import css from "./MyApplicationsList.module.scss";
import { useHistory } from "react-router-dom";
import https from "../../../../services/https";
import NoData from "../../../../components/NoData/NoData";

const MyApplicationsList = (props) => {
  const history = useHistory();
  const goToDescription = (applicationId) =>
    history.push("my-applications/" + applicationId);

  const [getting, setGetting] = useState(false);
  const [jobs, setJobs] = useState([]);
  const getJobs = async () => {
    setGetting(true);
    try {
      const res = await https.get("/application/user-all");
      if (res.data) {
        console.log(res.data);
        setJobs(res.data);
      }
    } catch (error) {
      if (error.response) {
        // setErrorMessage(error.response.data.message);
      } else {
        // setErrorMessage(error.message);
      }
    } finally {
      setGetting(!true);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);
  return (
    <div className="row justify-content-center">
      {jobs.length ? (
        jobs.map((item, index) => {
          const { _id, title, description } = item.jobDetails;
          const { status } = item;
          return (
            <div
              className="col-md-6 mb-4"
              key={index}
              onClick={() => goToDescription(item._id)}
            >
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
                  <h4 className="media-heading">{title}</h4>
                  {description.substr(0, 80) +
                    (description.length > 80 ? " ..." : "")}
                  <div className="text text-sm font-weight-light">
                    <strong>Status:</strong>{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {status || "pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <NoData
          title="No applications!"
          text="Kindly apply for a job to see your applications"
        />
      )}
    </div>
  );
};

export default MyApplicationsList;
