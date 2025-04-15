import React from "react";
import classes from "./ConfirmationModal.module.css";

function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div className={classes.modal}>
      <div className={classes["modal-content"]}>
        <h2>Confirm Deletion</h2>
        <p>{message}</p>
        <div className={classes["modal-buttons"]}>
          <button className={classes["confirm-button"]} onClick={onConfirm}>
            Confirm
          </button>
          <button className={classes["cancel-button"]} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
