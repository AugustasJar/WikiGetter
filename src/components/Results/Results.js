import React, { useEffect,Fragment, useState } from "react";
import "./Results.css";
import Result from './Result/Result';

const Results = (props) => {

    return (
        <div className="Results">
            {
                props.data !== null ? props.data.map((item,index) => (
                    <React.Fragment>
                        <div className="Results-block" key={index + 500} id={`RB${index}`}>
                            {item.map((result,resultIndex) => (
                                <Result key={resultIndex} 
                                    changeTarget = {props.changeTarget} 
                                    id={resultIndex} 
                                    parentId={`RB${index}`}
                                    extractHandler={props.extractHandler}>
                                        {item[resultIndex]}
                                </Result>
                            ))}
                            <div key={index +600} className="Results-pop-hitbox" onClick={() => {props.popResults(index)}}>
                                 <div key={index +699} className="Results-pop" />
                            </div>
                        </div>
                    </React.Fragment>
                )) : null   
            }
        </div>
    );
};
export default Results;