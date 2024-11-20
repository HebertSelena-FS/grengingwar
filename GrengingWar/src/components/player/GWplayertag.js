import React from "react";
import './gwplayertag.css'

// Dummy Component
const GWplayertag = props => {
    return(
        <div className="btn">
            <div>{props.name}</div> 
            <div>{ props.type}</div>
            <div className="health">{props.health}</div>
        </div>
    );
}
export default GWplayertag;
