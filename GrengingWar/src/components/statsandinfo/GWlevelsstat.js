import React from "react";
import './gwlevelsstat.css'

// Dummy Component
const GWlevelsstat = props => {
    return(
        <div className="btn">
            <div>{props.name} {props.level}</div>
            <div>{props.currentxp}/{props.xptolevel}</div>
            <div>Total xp {props.totalxp}</div>
        </div>
    );
}
export default GWlevelsstat;
