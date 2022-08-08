import React from 'react';
import "./Description.css"
import {Link} from "react-router-dom";

const Description = () => {
    return (
        <div className="description-center">
            <div className="description-container">
                <h2 className="description-header">Typing test</h2>
                <h3 className="description-text" >If you want a quick way to test your typing speed, try out our 1-minute Typing Test (available in 2 languages). You can quickly see how fast you can type and compare your results with your friends. <br/> <br/> Try it out and see if you can beat <Link  to={"/profile/ryan/"} style={{textDecoration: 'underline', color: 'black'}}> Ryan's </Link>highscore? ;)</h3>
            </div>
        </div>

    );
};

export default Description;