import React from "react";

import './index.css'

const Dialog = (props) => {
    return(
        <div className="dialog-box">
            <div className="dialog-message">
                <p>Are you sure you want to delete?</p>
            </div>
            <div className="dialog-confirm">
                <button className="confirm-cancel" onClick={props.onCancel}>No</button>
                <button className="confirm-delete" onClick={props.onDelete}>Yes</button>
            </div>
        </div>
    )
}

export default Dialog