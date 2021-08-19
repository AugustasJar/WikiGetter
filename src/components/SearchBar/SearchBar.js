import { forwardRef } from "react";
import './SearchBar.css';

const SearchBar = forwardRef((props,ref) => {
    return (
    <form className="search-wrapper" onClick={event => event.preventDefault()}>
        <input 
        type="text" 
        className="SearchBar"
        ref={ref}
        placeholder="Search...">
        </input>
        <button onClick={props.click} className="Search-button"/>
    </form>
    )
})
export default SearchBar;