import ReactDOM from 'react-dom';
import './Modal.css'
import {useTransition,a} from 'react-spring';
import React from 'react';
const Modal = (props) => {
    const transition1 = useTransition(props.show,{
        from: {top: "100%"},
        enter: {top: "10%"},
        leave: {top: "100%"}
    })
    const transition2 = useTransition(props.show, {
        from: {opacity: "0"},
        enter: {opacity: "1"},
        leave: {opacity: "0"}
    })
    return ReactDOM.createPortal(
        <React.Fragment>
            {transition1((style,item) => item ? 
                <a.div className="modal" style= {style}>
                    {props.children}
                </a.div>: null)}
            {transition2((style,item ) => item ? 
            <a.div className="backdrop" style={style} onClick={props.toggleModal}/>: null)}
        </React.Fragment>
    ,document.getElementById('modal'));
}
export default Modal;
