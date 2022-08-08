import React, {useEffect, useState} from 'react';
import "./TypingTest.css"
import {getWords} from "../../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {changeLanguage, changePickedLanguage} from "../../redux/languageSlice";
import {
    changeCorrectKeystrokes,
    changeCorrectWords, changeIncorrectKeystrokes,
    changeIncorrectWords,
    changeKeystrokes,
    changeResultDone
} from "../../redux/resultSlice";
import useFetch from "../../hooks/useFetch";
let choice = ""
let nineWords = 0;
let counter = 0;
let currentArrayState = [];


const TypingTest = () => {
    const [arrayOfWords, setArrayOfWords] = useState([])
    const [currentWord, setCurrentWord] = useState(1);
    const [previousWords, setPreviousWords] = useState([]);
    const [customStyle, setCustomStyle] = useState("current-word");
    const [correctWords, setCorrectWords] = useState(0);
    const [incorrectWords, setinCorrectWords] = useState(0);
    const [timer, setTimer] = useState(60);
    const [shouldCount, setShouldCount] = useState(false);
    const [currentInput, setCurrentInput] = useState("");
    const [inputRestart, setInputRestart] = useState(false);
    const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
    const [incorrectKeystrokes, setIncorrectKeystrokes] = useState(0);

    const dispatch = useDispatch();

    const passedLanguage = useSelector((state) => state.language.languageChoice)
    const currentlyPicked = useSelector((state) => state.language.pickedLanguage)
    const resDone = useSelector((state) => state.result.resultDone)
    console.log(resDone)

    console.log(currentArrayState)


    const [pickedLanguage, setPickedLanguage] = useState(currentlyPicked)

    function handleRestart(sent) {
        setShouldCount(false)
        setTimer(60)
        setInputRestart(true)
        setTimeout(() => {
            setInputRestart(false)
        })
        if (sent) {
            reFetch(passedLanguage)
        }
        setCustomStyle("current-word")
        currentArrayState = [];
        setCurrentWord(1);
        setCorrectWords(0);
        setinCorrectWords(0);
        setPreviousWords([]);
        setCorrectKeystrokes(0)
        setIncorrectKeystrokes(0)
        counter = 0;
        nineWords = 0;
    }
    async function handleLanguage(language) {
        if (language === "default") {
            await setPickedLanguage(["welcome-language-picked", "welcome-language-unpicked"])

        } else {
            await setPickedLanguage(["welcome-language-unpicked","welcome-language-picked"])

        }
        dispatch(changeLanguage({language}))
        dispatch(changePickedLanguage({pickedLanguage}))
        handleRestart(false)
    }

    const {data,loading,error,reFetch} = useFetch("/words/wordsByParameters/" + passedLanguage)

    useEffect(() => {
        dispatch(changePickedLanguage({pickedLanguage}))
        //sets the array to the fetched array
        setArrayOfWords(data)



        if (inputRestart) {
            setCurrentInput("")
        }

    })
    useEffect(() => {
        //if timer ended then it stops timers
        if (timer === 0) {
            setShouldCount(false)
            dispatch(changeCorrectWords(correctWords))
            dispatch(changeIncorrectWords(incorrectWords))
            dispatch(changeCorrectKeystrokes(correctKeystrokes))
            dispatch(changeIncorrectKeystrokes(incorrectKeystrokes))
            dispatch(changeResultDone(true))
            handleRestart()

        }
        //////////////////////////////////////////////////////////////////timer

            if(shouldCount){
                const interval = setInterval(() => setTimer(timer - 1),
                    1000
                );
                return () => clearInterval(interval);
            }
        //////////////////////////////////////////////////////////////////timer

    }, [shouldCount,timer])
    // console.log(arrayOfWords)

    function timeHandler() {

    }
    function handleChange(event) {
        setCurrentInput(event.target.value)

        counter++

        if (event.target.value === " ") {
            console.log("Input is space")
            setCurrentInput("")
        } else {
            setShouldCount(true)
            console.log(event.target.value)
            console.log(arrayOfWords[currentWord-1])
            if (event.target.value.slice(0,event.target.value.length) === arrayOfWords[currentWord-1].slice(0,event.target.value.length)) {
                setCustomStyle("current-word");
                setCorrectKeystrokes(correctKeystrokes +1)
            } else {
                setCustomStyle("current-word-wrong");
                setIncorrectKeystrokes(incorrectKeystrokes +1)
            }
            if (event.target.value[event.target.value.length-1] === " ") {
                if (event.target.value.slice(0,event.target.value.length-1) === arrayOfWords[currentWord-1]) {
                    console.log("equal");
                    currentArrayState.push(<span key={counter} className="previous-word-right"> {arrayOfWords[currentWord-1]} </span>)
                    setCorrectWords(correctWords+1)


                } else {
                    console.log("not equal")
                    currentArrayState.push(<span key={counter} className="previous-word-wrong"> {arrayOfWords[currentWord-1]} </span>)
                    setinCorrectWords(incorrectWords+1)

                }


                // currentArrayState.push(arrayOfWords[currentWord-1])
                setCustomStyle("current-word");
                console.log(currentArrayState)
                setCurrentInput("");

                if (currentWord % 9 === 0) {
                    nineWords = nineWords+9
                    currentArrayState = [];
                    setPreviousWords([]);
                } else {
                    setPreviousWords(function() {
                        return  currentArrayState//.concat(currentArrayState);
                    });

                }



                console.log(previousWords)
                setCurrentWord(currentWord +1)
            }


        }

    }


    return (
        <div className="welcome-outest-container">
            <div className="typing-outer-container">
                <div className="typing-container">
                    <div className="language-picker"><span className={pickedLanguage[0]} onClick={() => handleLanguage("default")}>ENGLISH</span> | <span className={pickedLanguage[1]} onClick={() => handleLanguage("russian")}>RUSSIAN</span></div>
                    <div className="typing-box">
                        {loading? ("Loading...") : <>
                        <button className="typing-box-text"><span> {previousWords.slice(0, previousWords.length)} </span> <span
                            className={customStyle}> {arrayOfWords[currentWord - 1]} </span> {arrayOfWords.slice(currentWord, nineWords + 9).join(" ")}</button>
                        <button className="typing-box-text">{arrayOfWords.slice(nineWords + 9, nineWords + 18).join(" ")}</button> </>}
                    </div>
                    <div className="typing-spot"> <input value={currentInput} className="typing-spot-input" type="text" onChange={handleChange}/></div>
                    <div className="typing-buttons">
                        <button className="button-time">{timer}</button>
                        <button onClick={handleRestart} className="button-restart">Restart</button>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default TypingTest;