import './InfoBox.css'
import Button from '../UI/Button/Button'
const InfoBox = (props) => {
    
    return (
        <div className="InfoBox">
            {props.children}
            <div className="button-container">
                <Button click={props.reroll}>Rerroll</Button>
                <Button click={props.goTo}> Go To </Button>
            </div>
         </div>
    )
}
export default InfoBox