import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./about.css"

const About = () => {
    return (
        <>
            <Navbar about={true} />
            <div className="about-container">
                <img className="about-img" src="/about.svg" />
                <div className="about-text-container">
                    <div className="about-text">Keyboard - is a typing speed test app created primarily for educational purposes and inspired by its most famous analogue - 10 Fast Fingers </div>
                    <div className="about-text">Made with the React, Node, Express and MongoDB. You can take a look at the code at github.com/justcallmeRyan</div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;