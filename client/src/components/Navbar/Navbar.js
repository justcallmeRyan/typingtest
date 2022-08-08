import React, {useState} from 'react';
import "./Navbar.css"
import { useContext } from "react";
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/userSlice";
import {changeResultDone} from "../../redux/resultSlice";
import {changeStart} from "../../redux/startSlice";
import {changePickedLanguage} from "../../redux/languageSlice";



const Navbar = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state=>state.user)

    const [picked, setPicked] = useState("nav-current")

    function handleLogout() {
        navigate("/")
        dispatch(logout())

    }
    function handleHome() {
        dispatch(changeResultDone(false))
    }

    return (

        <div className="nav-container">

            <Link to={"/"}> <div onClick={handleHome}> <img src="/LogoSmall.svg" /> </div> </Link>
            <div className="nav-components">
                <Link to={"/"} style={{textDecoration: 'none', color: 'black'}}>{props.typingtest? <span className="nav-components-spans-picked ">Typing Test</span> : <span className="nav-components-spans ">Typing Test</span>}</Link>
                <Link to={"/leaderboard"} style={{textDecoration: 'none', color: 'black'}}>{props.leaderboard? <span className="nav-components-spans-picked ">Leaderboard</span> : <span className="nav-components-spans ">Leaderboard</span>}</Link>
                <Link to={"/about"} style={{textDecoration: 'none', color: 'black'}}> {props.about? <span className="nav-components-spans-picked ">About</span> : <span className="nav-components-spans ">About</span>}</Link>
            </div>
            {currentUser? (
                <div className="nav-profile">
                    <img className="nav-profile-img" src="/userprofile.svg" />
                    <Link to={"/profile/" + currentUser.username}> <span> {currentUser.username} </span> </Link>
                    <button onClick={handleLogout} >Logout</button>
                </div>
            ): (<div className="nav-login-register">
                <Link to={"/login"} ><button className="nav-login" >Log in</button></Link>
                <span> | </span>
                <Link to={"/register"}><button className="nav-register">Register </button></Link>
            </div>)}





        </div>
    );
};

export default Navbar;

// <div className="navContainer">
//     <span className="logo">typeTest</span>
//     { user? (
//         <div>
//             <Link to={"/profile/" + user.username}> <span>{user.username}</span> </Link>
//             <button onClick={handleLogout}>Logout</button>
//         </div>): (
//         <div className="navItems">
//
//             <Link to={"/register"}><button className="navButton">Register</button></Link>
//             <Link to={"/login"}><button className="navButton">Login</button></Link>
//         </div>
//     ) }
// </div>