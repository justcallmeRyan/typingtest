import React, {useEffect} from 'react';
import "./Results.css"
import {useDispatch, useSelector} from "react-redux";
import {changeResultDone} from "../../redux/resultSlice";
import {changePickedLanguage} from "../../redux/languageSlice";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

const Results = () => {
    const {currentUser} = useSelector(state=>state.user)
    const dispatch = useDispatch();
    function handleRestart() {
        dispatch(changeResultDone(false))

    }
    const currentlyPicked = useSelector((state) => state.language.pickedLanguage)
    const currentLanguage = useSelector((state) => state.language.languageChoice)
    const correctWords = useSelector((state) => state.result.correctWords)
    const incorrectWords = useSelector((state) => state.result.incorrectWords)
    const correctKeystrokes = useSelector((state) => state.result.correctKeystrokes)
    const incorrectKeystrokes = useSelector((state) => state.result.incorrectKeystrokes)
    const {data,loading,error,reFetch} =  useFetch("/users/user/"+ currentUser.username)

    console.log(currentLanguage)
    async function sendResult() {

        if (currentUser) {

            if (currentLanguage === "default") {
                // data[2] is english highscore
                if (data[2] < correctWords) {
                    await axios.put("/users/result/"+currentUser._id, {"highScoreEnglish": correctWords})
                    console.log("Updated English highscore")
                }
            }
            if (currentLanguage === "russian") {
                // data[3] is russian highscore
                if (data[3] < correctWords) {
                    await axios.put("/users/result/"+currentUser._id, {"highScoreRussian": correctWords})
                    console.log("Updated Russian highscore")
                }

            }
        } else {
            console.log("No user logged in, not sending result to database")
        }
    }
    useEffect(() => {
        sendResult()
    })

    return (
        <div className="results-outest-container">
            <div className="results-container">
                <div className="results-box">
                    <div className="results-color"> Result </div>
                    <div className="wpm-container">
                        <span className="wpm-text">{correctWords} WPM</span>
                        <span className="wpm-mini-text">(words per minute)</span>
                    </div>
                    <div className="res-hr"> </div>
                        <div className="key-strokes">
                            <div className="key-strokes-text">Keystrokes:</div>
                            <div className="key-strokes-result">(<span className="results-green">{correctKeystrokes+correctWords}</span> / <span className="results-red">{incorrectKeystrokes-correctWords}</span>) {correctKeystrokes + incorrectKeystrokes}</div>
                        </div>
                        <div className="res-hr"> </div>
                        <div className="key-strokes">
                            <div className="key-strokes-text">Accuracy:</div>
                            <div className="key-strokes-result">{ Math.round((100- (((incorrectKeystrokes-correctWords)/ (correctKeystrokes + incorrectKeystrokes)) * 100)))  }%</div>
                        </div>
                        <div className="res-hr"> </div>
                        <div className="key-strokes">
                            <div className="key-strokes-text">Correct words:</div>
                            <div className="key-strokes-result">{correctWords}</div>
                        </div>
                        <div className="res-hr"> </div>
                        <div className="key-strokes">
                            <div className="key-strokes-text">Wrong words:</div>
                            <div className="key-strokes-result">{incorrectWords}</div>
                        </div>



                </div>
                <button onClick={handleRestart} className="results-button">Restart the game</button>
            </div>


        </div>
    );
};

export default Results;