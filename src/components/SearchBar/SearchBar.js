import { forwardRef } from "react";
import './SearchBar.css';

const SearchBar = forwardRef((props,ref) => {
    return (
    <input 
        type="text" 
        className="SearchBar-alternative"
        ref={ref}>
        </input>)
})
export default SearchBar;