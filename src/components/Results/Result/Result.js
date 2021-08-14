import "./Result.css";
import { useTransition,a} from "react-spring";
import React from "react";
const Result = (props) => {
    const style = `result-container ${props.customStyle}`;
    return (
            <a.div className={style} style={props.style} id={props.myId} >
                <a.div className="Result" style={props.style} id={`w${props.myId}`}>
                    {props.children}
                </a.div>
                <a.div className ="result-dropdown" style={props.style}>
                    {props.snippet === null ? "Unavailable" : props.snippet}
                </a.div>
            </a.div>    
    );
};
export default Result;