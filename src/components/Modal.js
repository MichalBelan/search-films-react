import "./Modal.css";
import { useEffect } from "react";

const Modal = ({ notifContent, closeNotif }) => {
  useEffect(() => {
    setTimeout(() => {
      closeNotif();
    }, 2000);
  });
  return (
    <div className="modal-box">
      <div className="modal-text">
        <p>{notifContent}</p>
      </div>
    </div>
  );
};

export default Modal;
