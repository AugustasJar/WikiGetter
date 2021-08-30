import './SubHeader.css'
import { animated } from "@react-spring/web";
import closeIcon from './cancel.png'
const SubHeader = (props) => {
    return (
        <animated.div className="SubHeader" style={props.style}>
            {props.children}
            <animated.img src={closeIcon} className="SubHeader-close" onClick={props.close}/>
        </animated.div>
    )
}

export default SubHeader;