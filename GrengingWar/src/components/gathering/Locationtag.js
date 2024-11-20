import React from "react";
import './locationtag.css'

// Dummy Component
const Locationtag = props => {
    return(
        <div className="locationtag">
            <div>{props.name}</div> 
            <div>{ props.count}</div>
        </div>
    );
}
export default Locationtag;
