import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../AppProvider";
import https from "../../../services/https";
import css from "./Messages.module.scss";
import moment from "moment";

const Messages = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [gettingMessage, setGettingMessages] = useState(false);

  const [currentMessage, setCurrentMessage] = useState(null);
  const [gettingCurrentMessage, setGettingCurrentMessage] = useState(null);
  // For error
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);
  const toggleErrorPopup = () => setErrorPopupVisible(!errorPopupVisible);
  //

  const { userDetails, userType } = useContext(AppContext);

  // //Message Modal
  // const [messageModalOpen, setMessageModalOpen] = useState(false);
  // const toggleMessageModal = () => setMessageModalOpen(!messageModalOpen);
  // //

  const getAllMessagesInMessenger = async () => {
    setGettingMessages(true);
    try {
      const res = await https.get(
        `/messenger/all-messages-in-messenger/inbox/${userDetails?._id}`
      );
      if (res.data) {
        console.log(res.data);
        setMessages(res.data);
        // if(currentMessage) {
        //   // getCurrentMessageAndMarkAsRead(currentMessage)
        // }
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message);
      }
      toggleErrorPopup();
    } finally {
      setGettingMessages(false);
    }
  };
  const getCurrentMessageAndMarkAsRead = async (message) => {
    setGettingCurrentMessage(true);
    try {
      const res = await https.get(
        `/messenger/get-current-and-mark-all-read/${message._id}`
      );
      if (res.data) {
        console.log(res.data);
        setCurrentMessage(res.data);
        getAllMessagesInMessenger();
        var div = document.getElementById("chatBox");
        div.scrollTop = div.scrollHeight - div.clientHeight;
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message);
      }
      toggleErrorPopup();
    } finally {
      setGettingCurrentMessage(false);
    }
  };

  const [sendingMessage, setSendingMessage] = useState(false);
  const sendMessage = async (message) => {
    setSendingMessage(true);
    try {
      const res = await https.post("/messenger", {
        messageDoc: { message },
        application: currentMessage.application,
        candidate: currentMessage.candidate,
        employer: currentMessage.employer,
        userType,
      });
      if (res.data) {
        setMessage("");
        getAllMessagesInMessenger();
        getCurrentMessageAndMarkAsRead(currentMessage);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message);
      }
      toggleErrorPopup();
    } finally {
      setSendingMessage(false);
    }
  };

  const toTrash = async (messageId) => {
    setGettingCurrentMessage(true);
    try {
      const res = await https.put(`/messenger/${messageId}/to-trash`);
      if (res.data) {
        setCurrentMessage(null);
        getAllMessagesInMessenger();
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message);
      }
      toggleErrorPopup();
    } finally {
      setGettingCurrentMessage(false);
    }
  };

  const getDetails = (item) => {
    if (userType === "employer") {
      return {
        name: [
          item.candidateDetails?.firstName,
          item.candidateDetails?.lastName,
        ].join(" "),
        message:
          item.conversations?.length &&
          item.conversations[item.conversations?.length - 1],
        logo: "",
      };
    } else {
      return {
        name: [
          item.employerDetails?.firstName,
          item.employerDetails?.lastName,
        ].join(" "),
        message:
          item.conversations?.length &&
          item.conversations[item.conversations?.length - 1],
        logo: "",
      };
    }
  };
  const totalUnread = () => {
    if (messages.length) {
      return String(
        messages.reduce((acc, item) => acc + (item.unreadMessages || 0), 0) || 0
      );
    }
    return "0";
  };

  useEffect(() => {
    getAllMessagesInMessenger();
  }, [userDetails]);
  return (
    <>
      <div className="row rounded-lg overflow-hidden shadow">
        {/* <!-- Users box--> */}
        <div className={(currentMessage ? "col-5" : "col-12") + " " + "px-0"}>
          <div className="bg-white">
            <div className="bg-gray px-4 py-2 bg-light">
              <p className="h5 mb-0 py-1">Recent ({totalUnread() || "0"})</p>
            </div>
            <div className={css.messagesbox}>
              {messages.map((item, index) => {
                const { _id, unreadMessages } = item;
                const { message, name, logo } = getDetails(item);
                return (
                  <div
                    key={index}
                    className={"list-group rounded-0"}
                    key={index}
                    onClick={() => getCurrentMessageAndMarkAsRead(item)}
                  >
                    {/* <div className=""> */}
                    <a
                      className={`list-group-item list-group-item-action ${
                        currentMessage && currentMessage._id === _id && "active"
                      } rounded-0`}
                    >
                      <div className="media">
                        <img
                          src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                          alt="user"
                          width="50"
                          className="rounded-circle"
                        />
                        <div className="media-body ml-4">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <h6 className="mb-0">{name}</h6>
                            <small className="small font-weight-bold">
                              {moment(message?.time).fromNow()}
                            </small>
                          </div>
                          <p className="font-italic mb-0 text-small">
                            {message?.message}
                          </p>
                        </div>
                      </div>
                    </a>
                    {/* </div> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <!-- Chat Box--> */}
        {currentMessage && (
          <div className="col-7 px-0">
            <div
              className={css.chatbox + " " + "px-4 py-5 bg-white"}
              id={"chatBox"}
            >
              {/* <!-- Sender Message--> */}
              {currentMessage.conversations.map((item, index) => {
                const { sentBy, message, time } = item;
                return sentBy !== userDetails._id ? (
                  <div className="media w-50 mb-3" key={index}>
                    <img
                      src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                      alt="user"
                      width="50"
                      className="rounded-circle"
                    />
                    <div className="media-body ml-3">
                      <div className="bg-light rounded py-2 px-3 mb-2">
                        <p className="text-small mb-0 text-muted">{message}</p>
                      </div>
                      <p className="small text-muted">
                        {moment(time).format("hh:mm A | MMM YY")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="media w-50 ml-auto mb-3" key={index}>
                    <div className="media-body mr-3">
                      <div className="bg-primary rounded py-2 px-3 mb-2">
                        <p className="text-small mb-0 text-white">{message}</p>
                      </div>
                      <p className="small text-muted">
                        {moment(time).format("hh:mm A | MMM YY")}
                      </p>
                    </div>
                    <img
                      src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                      alt="user"
                      width="50"
                      className="rounded-circle"
                    />
                  </div>
                );
              })}

              {/* <!-- Reciever Message--> */}
            </div>

            <div className={css.inputbox + " " + "bg-light"}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Type a message"
                  aria-describedby="button-addon2"
                  className="form-control rounded-0 border-0 py-4 bg-light"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    id="button-addon2"
                    type="submit"
                    className="btn btn-link"
                    disabled={!message}
                    onClick={() => sendMessage(message)}
                  >
                    {" "}
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Messages;
