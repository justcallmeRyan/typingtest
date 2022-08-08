import React, {useEffect, useState} from 'react';
import "./leaderboard.css"
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import UserCard from "../../components/UserCard/UserCard";
import useFetch from "../../hooks/useFetch";


const Leaderboard = () => {
    const [language, setLanguage] = useState("english")
    const [buttonStyle, setButtonStyle] = useState(["leaderboard-language-picked", "leaderboard-language-notpicked"])

    const {data, loading, error, reFetch} = useFetch("/users/" + language + "/get")

    const [array, setArray] = useState(data)
    useEffect(() => {
        setArray(data)
    })

    const map1 = array.map((x, index) => {
        // return [x._id, x.username,x.highScoreEnglish]
        return <UserCard key={index} number={index + 1} username={x.username} score={x.highScoreEnglish}/>
    })
    const map2 = array.map((x, index) => {
        // return [x._id, x.username,x.highScoreEnglish]
        return <UserCard key={index} number={index + 1} username={x.username} score={x.highScoreRussian}/>
    })

    function handleLanguage(language) {
        setLanguage(language)
        if (language === "english") {
            setButtonStyle((["leaderboard-language-picked", "leaderboard-language-notpicked"]))
        }
        if (language === "russian") {
            setButtonStyle((["leaderboard-language-notpicked", "leaderboard-language-picked"]))
        }

    }


    return (
        <div>
            <Navbar leaderboard={true}/>
            <div className="leaderboard-top-container">
                <div className="leaderboard-main-content">
                    <div className="leaderboard-language-container">
                        <div onClick={() => handleLanguage("english")} className={buttonStyle[0]}>
                            English
                        </div>
                        <div className="leaderboard-circle-container">
                            <div className="leaderboard-circle"></div>
                        </div>
                        <div onClick={() => handleLanguage("russian")} className={buttonStyle[1]}>
                            Russian
                        </div>
                    </div>
                    <div className="leaderboard-table">
                        <div className="leaderboard-text">Top 20 Leaderboard</div>
                        <div className="leaderboard-list">
                            <div className="leaderboard-number"></div>
                            <div className="leaderboard-username">Username</div>
                            <div className="leaderboard-wpm">WPM</div>
                            <div className="leaderboard-wpm">Ago</div>
                        </div>
                        <div className="leaderboard-hr"></div>
                        {loading ? <span> Loading </span> : language === "english" ? map1 : map2}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Leaderboard;