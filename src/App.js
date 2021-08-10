import React,{useState,useEffect, createRef} from "react";
import useFetchData from './hooks/useFetchData.js';

import './App.css';
import params from './Params';


import SearchBar from "./components/SearchBar/SearchBar.js";
import Button from "./components/UI/Button/Button.js";
import Results from "./components/Results/Results";
import Logo from './components/UI/Logo/Logo';
import Footer from './components/Footer/Footer';

function App() {
  const [status, pages,fetchData] = useFetchData();
  const searchBarREF = React.createRef();
  const [showResults,setShowResults] = useState(false);
  const [generatedPages,setGeneratedPages] = useState(null);
  const [lastTitle, setLastTitle] = useState("");
  useEffect(() => {
    searchBarREF.current.focus();
  },[]);
  useEffect(() => {
    if ( status==="completed") {
      generatePages();
      setShowResults(state => (!state));
    }
  },[status]);
  const searchHandler = () => {
    params.titles = searchBarREF.current.value;
    if (params.titles != lastTitle && !showResults) {
      fetchData(params);
      setLastTitle(params.titles);
    } else if (params.titles != lastTitle && showResults) {
        setShowResults(state => !state);
        setTimeout(()=> {
          fetchData(params);
          setLastTitle(params.titles);
        },1000);
   } else {
        rerollHandler();
   }
  }
  const randomHandler = () => {
    setShowResults(state => {return !state});
  }
  const rerollHandler = () => {
    setShowResults(state => !state)
    setTimeout(() => {
      generatePages();
      setShowResults(state => !state)
    },1000)
  }
  const generatePages = () => {
    if (pages!= null) {
      try {
        let arr = [];
        const obj = pages.query.pages[Object.keys(pages.query.pages)[0]];
        for (let i=0;i<6;i++) {
          let temp = obj.links[Math.floor(Math.random()*obj.links.length)].title;
          if (temp.includes(":")) {
            i--;
          }
          else {
            arr.push(temp);
          }
        }
        setGeneratedPages(arr);
      }
      catch (error) {setGeneratedPages(null); console.log(error)}
    }
  }
  return (
    <div className= "App">
      <div className="Header"> WikiMap </div>
      <SearchBar ref={searchBarREF}/>
      <div className="Buttons">
        <Button click={randomHandler}> Random </Button>
        <Button click = {searchHandler}> Search </Button>
      </div>
      <Results showResults={showResults} data={generatedPages}/>
      <div className="reroll">
        <Button click={rerollHandler} style={{opacity: showResults ? 1 : 0}}>reroll</Button>
      </div>
      <Logo />
      <Footer />
    </div>
  )
}

export default App;
