import './Button.css';

const Button = (props) => {
    return (<button onClick={props.click} className="Button" style={props.style}> {props.children} </button>)
}
export default Button;