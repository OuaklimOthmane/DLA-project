import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Modal = ({
  title = "",
  show,
  showClosebutton = true,
  onClose,
  children,
  showHeader = true,
  width = "500px",
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const modalWrapperRef = useRef();

  // check if the user has clickedinside or outside the modal
  //   const backDropHandler = (e) => {
  //     if (!modalWrapperRef?.current?.contains(e.target)) {
  //       onClose();
  //     }
  //   };

  useEffect(() => {
    setIsBrowser(true);
    if (show) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "visible";

    // attach event listener to the whole windor with our handler
    // window.addEventListener("click", backDropHandler);

    // // remove the event listener when the modal is closed
    // return () => window.removeEventListener("click", backDropHandler);
  }, [show]);

  const handleCloseClick = (e) => {
    onClose();
    document.body.style.overflow = "visible";
  };

  const modalContent = (
    <div className={styles.modal_overlay}>
      <div
        className={styles.modal_wrapper}
        ref={modalWrapperRef}
        style={{ width: width }}
      >
        <div className={styles.modal}>
          {showHeader && (
            <div className={styles.modal_header}>
              <h1 className={styles.modal_title}>{title}</h1>
              {showClosebutton && (
                <button
                  type="button"
                  onClick={handleCloseClick}
                  className={styles.modal_close_btn}
                ></button>
              )}
            </div>
          )}

          <div className={styles.modal_body}>{children}</div>
        </div>
      </div>
    </div>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

// const fade_in = keyframes`
//   0% {
//     opacity: 0;
//   }
//   100% {
//     opacity: 0.9;
//   }
//   `;

export default Modal;
