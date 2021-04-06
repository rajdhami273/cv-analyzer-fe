import React from "react";
import css from "./Messages.module.scss";

const Messages = (props) => {
  return (
    <>
      {/* <!-- For demo purpose--> */}
      {/* <header className="text-center">
        <h1 className="display-4 text-white">Bootstrap Chat</h1>
        <p className="text-white lead mb-0">
          An elegant chat widget compatible with Bootstrap 4
        </p>
        <p className="text-white lead mb-4">
          Snippet by
          <a href="https://bootstrapious.com" className="text-white">
            <u>Bootstrapious</u>
          </a>
        </p>
      </header> */}

      <div className="row rounded-lg overflow-hidden shadow">
        {/* <!-- Users box--> */}
        <div className="col-5 px-0">
          <div className="bg-white">
            <div className="bg-gray px-4 py-2 bg-light">
              <p className="h5 mb-0 py-1">Recent</p>
            </div>

            <div className={css.messagesbox}>
              <div className="list-group rounded-0">
                <a className="list-group-item list-group-item-action active text-white rounded-0">
                  <div className="media">
                    <img
                      src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                      alt="user"
                      width="50"
                      className="rounded-circle"
                    />
                    <div className="media-body ml-4">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h6 className="mb-0">Jason Doe</h6>
                        <small className="small font-weight-bold">25 Dec</small>
                      </div>
                      <p className="font-italic mb-0 text-small">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore.
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Chat Box--> */}
        <div className="col-7 px-0">
          <div className={css.chatbox + " " + "px-4 py-5 bg-white"}>
            {/* <!-- Sender Message--> */}
            <div className="media w-50 mb-3">
              <img
                src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                alt="user"
                width="50"
                className="rounded-circle"
              />
              <div className="media-body ml-3">
                <div className="bg-light rounded py-2 px-3 mb-2">
                  <p className="text-small mb-0 text-muted">
                    Test which is a new approach all solutions
                  </p>
                </div>
                <p className="small text-muted">12:00 PM | Aug 13</p>
              </div>
            </div>

            {/* <!-- Reciever Message--> */}
            <div className="media w-50 ml-auto mb-3">
              <div className="media-body">
                <div className="bg-primary rounded py-2 px-3 mb-2">
                  <p className="text-small mb-0 text-white">
                    Test which is a new approach to have all solutions
                  </p>
                </div>
                <p className="small text-muted">12:00 PM | Aug 13</p>
              </div>
            </div>

            {/* <!-- Sender Message--> */}
            <div className="media w-50 mb-3">
              <img
                src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                alt="user"
                width="50"
                className="rounded-circle"
              />
              <div className="media-body ml-3">
                <div className="bg-light rounded py-2 px-3 mb-2">
                  <p className="text-small mb-0 text-muted">
                    Test, which is a new approach to have
                  </p>
                </div>
                <p className="small text-muted">12:00 PM | Aug 13</p>
              </div>
            </div>

            {/* <!-- Reciever Message--> */}
            <div className="media w-50 ml-auto mb-3">
              <div className="media-body">
                <div className="bg-primary rounded py-2 px-3 mb-2">
                  <p className="text-small mb-0 text-white">
                    Apollo University, Delhi, India Test
                  </p>
                </div>
                <p className="small text-muted">12:00 PM | Aug 13</p>
              </div>
            </div>

            {/* <!-- Sender Message--> */}
            <div className="media w-50 mb-3">
              <img
                src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                alt="user"
                width="50"
                className="rounded-circle"
              />
              <div className="media-body ml-3">
                <div className="bg-light rounded py-2 px-3 mb-2">
                  <p className="text-small mb-0 text-muted">
                    Test, which is a new approach
                  </p>
                </div>
                <p className="small text-muted">12:00 PM | Aug 13</p>
              </div>
            </div>

            {/* <!-- Reciever Message--> */}
            <div className="media w-50 ml-auto mb-3">
              <div className="media-body">
                <div className="bg-primary rounded py-2 px-3 mb-2">
                  <p className="text-small mb-0 text-white">
                    Apollo University, Delhi, India Test
                  </p>
                </div>
                <p className="small text-muted">12:00 PM | Aug 13</p>
              </div>
            </div>
          </div>

          <form action="#" className={css.inputbox + " " + "bg-light"}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Type a message"
                aria-describedby="button-addon2"
                className="form-control rounded-0 border-0 py-4 bg-light"
              />
              <div className="input-group-append">
                <button
                  id="button-addon2"
                  type="submit"
                  className="btn btn-link"
                >
                  {" "}
                  <i className="fa fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Messages;
