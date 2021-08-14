import React,{useState,useEffect, createRef} from "react";
import useFetchData from './hooks/useFetchData.js';

import './App.css';
import params from './Params';

import HelpIcon from './components/UI/HelpIcon/HelpIcon.js'
import SearchBar from "./components/SearchBar/SearchBar.js";
import Button from "./components/UI/Button/Button.js";
import Results from "./components/Results/Results";
import Logo from './components/UI/Logo/Logo';
import Footer from './components/Footer/Footer';
import Modal from './components/UI/Modal/Modal';

function App() {
  const [status, pages,fetchData] = useFetchData();
  const searchBarREF = React.createRef();
  const [showResults,setShowResults] = useState(false);
  const [generatedPages,setGeneratedPages] = useState(null);
  const [lastTitle, setLastTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
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
  const modalHandler = () => {
    setShowModal(state => !state);
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
      <Modal show={showModal} toggleModal={modalHandler}>
        <h1>Welcome to WikiMap</h1>
        <ul>
          <li>It uses Wikipedia API to simulate a mind maps by accessing internal links in wikipedia<br /></li>
          <li>Input a topic that interests you in the search bar below the brain, and click 'search' <br /></li>
          <li>You can mouse over the results to get snippets <br/></li>
          <li>Due to inconcistencies with the API itself sometimes snippets are unavailable<br /></li>
        </ul>
        <Button click={modalHandler}>close</Button>
      </Modal>
      <HelpIcon click={modalHandler}/>
      <div className="Header"> WikiMap </div>
      <SearchBar ref={searchBarREF}/>
      <div className="Buttons">
        <div className="Buttons-top">
          <Button click={randomHandler}> Random </Button>
        < Button click = {searchHandler}> Search </Button>
        </div>
        <div className="Buttons-bottom">
          <Button click={rerollHandler} style={{opacity: showResults ? 1 : 0}}>reroll</Button>
        </div>
      </div>
      <Results showResults={showResults} data={generatedPages}/>
      <Logo />
      <Footer />
    </div>
  )
}

export default App;
