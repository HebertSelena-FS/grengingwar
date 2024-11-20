import React from "react";
import './gwsector.css'

// Dummy Component
const GWsector = props => {
    return(
        <button id={props.id} onClick={props.onClick} >
            {props.name}
        </button>
    );
}
export default GWsector;
