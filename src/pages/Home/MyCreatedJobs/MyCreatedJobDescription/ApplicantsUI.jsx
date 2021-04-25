import React, { useRef } from "react";
import Modal from "../../../../components/Modal/Modal";
import config from "../../../../services/config";
import css from "./MyCreatedJobDescription.module.scss";

const ApplicantsUI = ({
  message,
  setMessage,
  toggleModal,
  showModal,
  applications,
  sendMessage,
  setCurrentApplication,
  changeStatus,
}) => {
  // const Modal = () =>
  const modalSwitch = useRef(null);
  return (
    <>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Experience</th>
              <th scope="col">Skills</th>
              <th scope="col">Aptitude</th>
              <th scope="col">Personality</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {applications.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.experienceGrade}%</td>
                  <td>{item.skillsGrade}%</td>
                  <td>{item.aptitudeGrade}%</td>
                  <td>{item.personalityGrade}%</td>
                  <td>{item.emailGrade}%</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      ref={modalSwitch}
                      onClick={() => {
                        changeStatus(item._id);
                        window.open(
                          config.serverUrl + "/public/" + item.resume,
                          "_blank"
                        );
                      }}
                    >
                      Resume
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      ref={modalSwitch}
                      onClick={() => setCurrentApplication(item)}
                    >
                      Send Message
                    </button>
                    <Modal
                      title="Send message"
                      buttons={[
                        {
                          title: "Close",
                          color: "secondary",
                          onClick: () => {},
                        },
                        {
                          title: "Send",
                          onClick: () => {
                            sendMessage();
                          },
                        },
                      ]}
                    >
                      <textarea
                        value={message}
                        className="form-control"
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message..."
                      ></textarea>
                    </Modal>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApplicantsUI;
