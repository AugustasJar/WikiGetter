import "./Result.css";
import { useTransition,a} from "react-spring";
import React from "react";
const Result = (props) => {
    return (
            <a.div className="Result-container" style={props.style}>
                <a.div className="Result" style={props.style}>
                    {props.children}
                </a.div>
                <a.div className="Result-button" 
                    onClick={() => {props.changeTarget(props.children)}}
                    >
                </a.div>
            </a.div>    
    );
};
export default Result;