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
        from: {opacity: 0},
        clamp: true,
        tension: 250,
        friction: 20
    })
    useEffect(() => {
        try {
            const l1 = document.getElementById("l4").offsetWidth;
            const l2 = document.getElementById("l5").offsetWidth;
            const l3 = document.getElementById("l6").offsetWidth;
            document.getElementById("l4").style.transform = `translate(-${270 + l1}px,-120px)`;
            document.getElementById("l5").style.transform = `translate(-${295 + l2}px,-20px)`;
            document.getElementById("l6").style.transform = `translate(-${270 + l3}px, 80px)`;
            try {
                
                for (let item in props.data) {
                    params.titles = params.titles.concat(props.data[item],'|');
                }
                params.titles.slice(0,-1);
                fetchData(params);
            } catch (error) {
                console.log(error);
            }
        }
        catch (error) {}
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
                    <React.Fragment key={index + 200}>
                        <a.div key={index} className={`Arrow Arrow-${index + 1}`} style={style}/>
                        <Result 
                            key={index + 5} 
                            customStyle={`result-container-${index + 1}`} 
                            style={style} 
                            myId={`l${index + 1}`}
                            snippet = {snippets != null ? snippets[props.data[index]] : null}
                            >
                                {props.data[index]}
                        </Result>
                    </React.Fragment>
                )): null
            }
        </div>
    );
};
export default Results;