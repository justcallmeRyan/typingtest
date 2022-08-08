import React, {useState} from 'react';
import "./home.css"
import Navbar from "../../components/Navbar/Navbar"
import Welcome from "../../components/Welcome/Welcome";
import Footer from "../../components/Footer/Footer";
import TypingTest from "../../components/TypingTest/TypingTest";
import { CSSTransition } from "react-transition-group";
import Description from "../../components/Description/Description";
import {useSelector} from "react-redux";
import Results from "../../components/Results/Results";




const Home = () => {
    const started = useSelector((state) => state.start.started)
    const resDone = useSelector((state) => state.result.resultDone)
    console.log(resDone)

    return (
        <>
            {/*<button onClick={handleChange}></button>*/}
            <Navbar typingtest={true}  />
            {started? resDone? <Results />: <TypingTest /> : (<Welcome />)  }
            <Description />

            <Footer />

            {/*<GameBox />*/}
            {/*<Whitebox/>*/}

        </>
    );
};

export default Home;