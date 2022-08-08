import React from 'react';
import {Link} from "react-router-dom";

const UserCard = (props) => {


    return (
        <>
            <div className="leaderboard-list">
                <div className="leaderboard-number">{props.number}</div>
                <div className="leaderboard-username"><Link to={"/profile/" + props.username}
                                                            style={{color: "black"}}>{props.username} </Link></div>
                <div className="leaderboard-wpm">{props.score}</div>
                <div className="leaderboard-wpm">2 days</div>
            </div>
            <div className="leaderboard-hr"></div>
        </>

    );
};

export default UserCard;