import "./Result.css";
import { useTransition,a} from "react-spring";
import React from "react";
const Result = (props) => {
    const style = `Result ${props.customStyle}`;
    return (
        <React.Fragment>
            <a.div className={style} id={props.myId} style={props.style}>
                {props.children}
                <a.div className ="result-dropdown" style={props.style}>
                    {props.snippet === null ? "unavailable" : props.snippet}
                </a.div>
            </a.div>
            
        </React.Fragment>
    );
};
export default Result;