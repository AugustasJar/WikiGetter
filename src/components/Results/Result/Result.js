import "./Result.css";
import { useSpring,a} from "react-spring";
import { useEffect, useState } from 'react'
import React from "react";
const Result = (props) => {
    const [loaded, setLoaded] =useState(false);
    useEffect(() => {
        setLoaded(true);
    },[])
    const style = useSpring({
        from:{
            opacity: loaded ? 0 : 1
        },
        delay: props.id*50
    })
    return (
            <a.div className="Result-container" style={style} id={`R${props.id}`} key = {props.id + 1000} >
                <a.div className="Result" 
                    style={props.style} 
                    onClick={() => {props.extractHandler(props.children)}}>
                    {props.children}
                </a.div>
                <a.div className="Result-button" 
                    onClick={() => {props.changeTarget(props.children,`R${props.id}`,props.parentId)}}
                    >
                </a.div>
            </a.div>    
    );
};
export default Result;