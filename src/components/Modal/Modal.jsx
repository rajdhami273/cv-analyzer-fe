import React from "react";
import css from "./Modal.module.scss";

const Modal = ({ title, children, buttons }) => {
  return (
    <>
      {/* <button
        type="button"
        className="btn btn-secondary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Send Message
      </button> */}
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              {buttons.map((item, index) => {
                const { title, type, color, other, onClick } = item;
                return (
                  <button
                    key={index}
                    type={type || "button"}
                    className={"btn btn-" + (color || "primary")}
                    data-dismiss="modal"
                    onClick={onClick ? onClick : null}
                  >
                    {title || "Save"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
