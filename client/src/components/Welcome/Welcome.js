import React, {useEffect, useState} from 'react';
import "./Welcome.css"
import {useDispatch, useSelector} from "react-redux";
import {changeStart} from "../../redux/startSlice";
import {update} from "../../redux/userSlice";
import {changeLanguage, changePickedLanguage} from "../../redux/languageSlice";
import useFetch from "../../hooks/useFetch";

const started = true;
const Welcome = () => {
    const [pickedLanguage, setPickedLanguage] = useState(["welcome-language-picked", "welcome-language-unpicked"])
    const [languageChoice, setLanguageChoice] = useState("default")
    const currentLanguage = useSelector((state) => state.language.languageChoice)
    const currentlyPicked = useSelector((state) => state.language.pickedLanguage)
    console.log("currently picked is " + currentlyPicked)
    useEffect(() => {
        dispatch(changePickedLanguage({pickedLanguage}))
    })

    const dispatch = useDispatch();

    function  handleLanguage(language) {
        if (language === "default") {
            setPickedLanguage(["welcome-language-picked", "welcome-language-unpicked"])

        } else {
            setPickedLanguage(["welcome-language-unpicked","welcome-language-picked"])

        }
         dispatch(changeLanguage({language}))
         dispatch(changePickedLanguage({pickedLanguage}))


    }

    function handleStarted() {

        dispatch(changeStart({started}));
    }

    return (

            // <div className="welcome-container">
            //     <img className="welcome-logo" src="/LogoBig.svg"/>
            //     <span className="welcome-text">Test & Improve your Typing Speed with our</span>
            //     <span className="welcome-text">free Typing Games</span>
            //     <button className="cta">Start typing test</button>
            // </div>

        <div className="welcome-outer-container">
            <div className="welcome-inner-container">
                <img className="welcome-img" src="./Tbutton.svg"/>
                <div className="welcome-get-ready">Get ready to type</div>
                <div className="welcome-get-ready">Let's go!</div>
                <div className="welcome-language-box"><div className="welcome-language-text"><span onClick={() => handleLanguage("default")} className={currentlyPicked[0]}>English </span>| <span onClick={() => handleLanguage("russian")} className={currentlyPicked[1]}>Russian </span></div></div>
                <div className="welcome-start-button" onClick={handleStarted}> <div  className="welcome-start-text">Start test ></div></div>

            </div>
        </div>



    );
};

export default Welcome;