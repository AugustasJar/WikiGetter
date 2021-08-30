import './HelpIcon.css'
const HelpIcon = (props) => {
     const reload = <img className="reload" src="https://img.icons8.com/windows/64/ffffff/refresh.png"/>
     return(
          <div className="HelpIcon" onClick={props.click}>
               <p className="HelpIcon-inner">{props.hasShown ? reload : '?'}</p>
          </div>
     )
}
export default HelpIcon