import React from "react";
import './gwresource.css'

// Dummy Component
const GWresourceheld = props => {
    return(
        <div className="btn">
            <div className="text">{props.name}</div>
            <div className="text">{props.count}</div>
        </div>
    );
}
export default GWresourceheld;
