import React, { useEffect,Fragment, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import {useTrail, a} from 'react-spring';
import "./Results.css";
import params from './params';

import Result from './Result/Result';

const Results = (props) => {
    const [status,pages,fetchData] = useFetchData();
    const [snippets, setSpippets] = useState();
    const trail = useTrail(6,{
        opacity: props.showResults? 1: 0,
        clamp: true,
        tension: 250,
        friction: 20,
    })
    useEffect(() => {
            try {
                for (let item in props.data) {
                    params.titles = params.titles.concat(props.data[item],'|');
                }
                params.titles.slice(0,-1);
                fetchData(params);
            } catch (error) {
                console.log(error);
            }
        },[props.data])
    useEffect(()=> {
        let obj = {};
        try {
        if ( pages != null) {
            for (const [key,value] of Object.entries(pages.query.pages)) {
                    obj[value.title] = value.extract !== undefined ? value.extract.trim() : "Unavailable";
                    if (obj[value.title] === "") {obj[value.title] = "Unavailable"}
                }
                
            }
            setSpippets(obj);
        } catch (error) {console.log(error)}
    },[pages])
    return (
        <div className="Results">
            {   
                props.data != null? trail.map((style,index) => (
                        <Result 
                            changeTarget = {props.changeTarget}
                            key={index + 5} 
                            style={style} 
                            snippet = {snippets != null ? snippets[props.data[index]] : null}
                            >
                                {props.data[index]}
                        </Result>
                )): null
            }
        </div>
    );
};
export default Results;