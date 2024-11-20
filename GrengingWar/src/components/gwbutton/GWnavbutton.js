import React from "react";
import './gwnavbutton.css'

// Dummy Component
const ButtonCard = props => {
    return(
        <button  className="nav-button">
            {props.btntext}
        </button>
    );
}
export default ButtonCard;

