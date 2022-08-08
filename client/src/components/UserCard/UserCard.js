import React from 'react';
import useFetch from "../../hooks/useFetch";
let array = []
const UserCard = (props) => {


    return (
        <>
            <div className="leaderboard-list">
                <div className="leaderboard-number">{props.number}</div>
                <div className="leaderboard-username">{props.username}</div>
                <div className="leaderboard-wpm">{props.score}</div>
                <div className="leaderboard-wpm">2 days</div>
            </div>
            <div className="leaderboard-hr"></div>
        </>

    );
};

export default UserCard;