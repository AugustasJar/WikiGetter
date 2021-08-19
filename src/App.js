import React,{useState,useEffect, createRef} from "react";
import useFetchData from './hooks/useFetchData.js';
import { useSpring,a} from "react-spring"

import './App.css';
import './css-variables.css'
import './css-variables.sass'

import params from './Params';

import HelpIcon from './components/UI/HelpIcon/HelpIcon.js'
import SearchBar from "./components/SearchBar/SearchBar.js";
import Button from "./components/UI/Button/Button.js";
import Results from "./components/Results/Results";
import Logo from './components/UI/Logo/Logo';
import Footer from './components/Footer/Footer';
import Modal from './components/UI/Modal/Modal';
import SubHeader from "./components/SubHeader/SubHeader.js";
import InfoBox from "./components/InfoBox/InfoBox.js";

function App() {
  const searchBarREF = React.createRef();
  const [status, pages,fetchData] = useFetchData();
  const [generatedPages,setGeneratedPages] = useState(null);
  const [lastTitle, setLastTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showResults,setShowResults] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownContent, setDropdownContent] = useState("")
  const [guideText,setGuideText] = useState("");
  const [hasShown, sethasShown] = useState(false)
  const style = useSpring({
    marginTop: showDropdown ? "0px" : "-110px",
    opacity: showDropdown ? 1 : 0
  })
  const guideFadeAway = useSpring({
    opacity: showResults ? 1 : 0,
    clamp: true,
    tension: 50,
    friction: 50,
    delay: 100
  })
  useEffect(() => {
    searchBarREF.current.focus();
  },[]);
  useEffect(() => {
    if ( status==="completed") {
      generatePages();
      sethasShown(true);
      setShowResults(state => (!state));
    }
  },[status]);
  const searchHandler = () => {
    console.log("searchHandler-enter")
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
          setGeneratedPages(arr);
      }
      catch (error) {setGeneratedPages(null);noResultsHandler()}
    }
  }
  const noResultsHandler = () => {
    console.log("no Results Handler")
    setDropdownContent(
      <p>no results were found. <br/> try <b>random</b>?</p>
    )
    setShowDropdown(true);
  }
  const changeTargetHandler = (target) => {
    searchBarREF.current.value = target;
    searchHandler();
  }
  const goToHandler = () => {
    const url = `https://en.wikipedia.org/wiki/${searchBarREF.current.value}`
    window.open(url)
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
      <div className="Header">
        <div className="Logo" />
        <div className="app-name"> Wikimap </div>
        <SearchBar ref ={searchBarREF} click={searchHandler}/>
      </div>
      <div className="content">
        <SubHeader style={style} close={() => setShowDropdown(false)}>
          {dropdownContent}
        </SubHeader>
        <a.div className="guide" style={hasShown ? guideFadeAway : {}}>
          {showResults ? <InfoBox reroll={rerollHandler} goTo={goToHandler}> {guideText} </InfoBox> : hasShown ? <InfoBox> {guideText} </InfoBox>: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate porttitor purus et commodo. Integer dictum leo volutpat leo ultricies porttitor. Vivamus vel feugiat libero. Aenean quis justo ut purus placerat ultrices. Donec sagittis dui et mi sodales, id consequat enim congue. Ut in rutrum enim. Donec in tortor libero."}
        </a.div>
        <Results data={generatedPages} 
          showResults={showResults} 
          changeTarget = {changeTargetHandler}
          />
      </div>
      <Footer />
    </div>
  )
}

export default App;
