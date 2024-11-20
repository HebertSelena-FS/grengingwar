import React from "react";
import './gwresource.css'

// Dummy Component
const GWresource = props => {
    return(
        <div className="btn">
            <div>{props.name}</div> 
            <div>{ props.type}</div>
            <div className="health">{props.health}</div>
        </div>
    );
}
export default GWresource;
