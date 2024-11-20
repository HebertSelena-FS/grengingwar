import React from "react";
import "./header.css"
// import background from "../image/gw-graphics.png";

function Template() {
    const [pageTitle] = ['Grenging War']
    
    return (
        <div className="header">
            <div className="h1" ></div>
        </div>
    )
}
 
export default Template;

const styles = {
    container:{
        // backgroundimage: {backgroundimage}
        // backgroundColor: background,style={styles.h1}
    },
    h1:{
        height: '100px',
        textAlign: 'center',
        color: 'red',
        padding: '25px',
        fontSize: '5rem',
        fontWeight: 'bold',
        boxShadow:'0 4px 8px 0 rgb(255, 2, 44), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        color: 'red',
        // width: '1700px',
    
    }
}