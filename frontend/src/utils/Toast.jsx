import React from "react";

const Toast = ({toastMsg , toastType}) => {
  return( <div className="toast toast-top toast-start">
          <div className={`alert ${toastType}`}>
            <span>{toastMsg}</span>
          </div>
        </div>);
};

export default Toast;
