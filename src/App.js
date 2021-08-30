import React,{useState,useEffect, createRef} from "react";
import useFetchData from './hooks/useFetchData.js';
import { useSpring,a} from "react-spring"

import './App.css';
import './css-variables.css'
import './css-variables.sass'

import params, {extractParams} from './Params';

import SearchBar from "./components/SearchBar/SearchBar.js";
import Button from "./components/UI/Button/Button.js";
import Results from "./components/Results/Results";
import Footer from './components/Footer/Footer';
import Modal from './components/UI/Modal/Modal';
import SubHeader from "./components/SubHeader/SubHeader.js";
import HelpIcon from './components/UI/HelpIcon/HelpIcon';

function App() {
  const searchBarREF = React.createRef();
  const [status, pages,fetchData] = useFetchData();
  const [extractStatus, extractData,fetchExtractData] = useFetchData();
  const [generatedPages,setGeneratedPages] = useState([]);
  const [lastTitle, setLastTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownContent, setDropdownContent] = useState("")
  const [showExtract, setShowExtract] = useState(false)
  const [guideText,setGuideText] = useState("");
  const [hasShown, sethasShown] = useState(false)
  const style = useSpring({
    marginTop: showDropdown ? "0px" : "-110px",
    opacity: showDropdown ? 1 : 0
  })
  const wikimapText = <div> 
      <h2>Welcome to WikiMap</h2>
      <ul>
        <li>It uses Wikipedia API to simulate mind maps by accessing internal links in wikipedia<br /></li>
        <li>Input a topic that interests you in the search <br /></li>
        <li>click on the results to get more information</li>
        <li> or you can expand the map by clicking on the triangles</li>
        <li> you can reroll the results by clicking the button on the right</li>
      </ul> 
    </div>
  useEffect(() => {
    searchBarREF.current.focus();
  },[]);
  useEffect(() => {
    if ( status==="completed") {
      generatePages();
      if (!hasShown) sethasShown(true); 
    }
  },[status]);
  useEffect(() => {
    if (extractStatus === "completed") {
      const obj = Object.values(extractData.query.pages)[0];
      const text = <div>
        <h1>{obj.title}</h1>
        <p>{obj.extract === "" ? "Unavailable" : obj.extract}</p>
      </div>
      setGuideText(text);
      setShowExtract(true);
      setShowModal(true);
    }
  }, [extractStatus])
  useEffect(() => {
    const content = document.getElementById('content');
    setTimeout(() => {
      content.scrollTo({
        left: content.offsetWidth,
        behavior: 'smooth'
      })
    },200)
  }, [generatedPages])
  const searchHandler = () => {
    params.titles = searchBarREF.current.value;
    fetchData(params);
    setLastTitle(params.titles)
  }
  const rerollHandler = () => {
    generatedPages.pop();
    setTimeout(() => {
      generatePages();
    },200)
  }
  const modalHandler = () => {
    setShowModal(state => !state);
  }
  const generatePages = () => {
    if (pages!= null) {
      try {
        let arr = [];
        const obj = Object.values(pages.query.pages)[0];
        setGuideText(obj.extract);
        for (let i=0;i<6;i++) {
          let temp = obj.links[Math.floor(Math.random()*obj.links.length)].title;
          if (temp.includes(":")) {
            i--;
          }
          else {
            arr.push(temp);
          }
        }
          setShowDropdown(false)
          setGeneratedPages(state => state.concat([arr]));
      }
      catch (error) {noResultsHandler()}
    }
  }
  const noResultsHandler = () => {
    setDropdownContent(
      <p>no results were found. <br/> try <b>random</b>?</p>
    )
    setShowDropdown(true);
  }
  const changeTargetHandler = (target,childId, parentId) => {
    const results = document.querySelectorAll(`#${parentId} .Result-container:not(#${childId})`);
    if (generatedPages.length > 1) {
      for (let i=0;i < results.length; i++) {
        results[i].style.backgroundColor = "#b1b1b1"
      }
    }
    searchBarREF.current.value = target;
    searchHandler();
  }
  const goToHandler = () => {
    const url = `https://en.wikipedia.org/wiki/${Object.values(extractData.query.pages)[0].title}`
    window.open(url)
  }
  const showExtractHandler = (title) => {
    extractParams.titles = title;
    fetchExtractData(extractParams);
  }
  const cleanSearchHandler = () => {
    setGeneratedPages([]);
    searchHandler();
  }
  const popResultsHandler = (index) => {
    setGeneratedPages(state => state.slice(0,index));
    cleanResults(index - 1);
  }
  const cleanResults = (index) => {
    const results = document.querySelectorAll(`#RB${index}`);
    if (generatedPages.length > 1) {
      for(let i=0; i < results[0].children.length -1; i++) {
        results[0].children[i].style.backgroundColor = '#306096'
      }
    }
  }
  return (
    <div className= "App">
      <HelpIcon hasShown={hasShown} click={hasShown ? rerollHandler : showExtractHandler}/>
      <Modal show={showModal} toggleModal={modalHandler}>
        {hasShown ? guideText : wikimapText}
        <div className="modal-buttons">
          <Button click={modalHandler}>close</Button>
          <Button click={goToHandler}>Go to</Button>
        </div>
      </Modal>
      <div className="Header">
        <div className="Logo" />
        <div className="app-name"> Wikimap </div>
        <SearchBar ref ={searchBarREF} click={cleanSearchHandler}/>
      </div>
      <div className="content" id="content">
        <SubHeader style={style} close={() => setShowDropdown(false)}>
          {dropdownContent}
        </SubHeader>
        <Results data={generatedPages} 
          changeTarget = {changeTargetHandler}
          extractHandler = {showExtractHandler}
          popResults = {popResultsHandler}
          />
      </div>
      <Footer />
    </div>
  )
}
export default App;
