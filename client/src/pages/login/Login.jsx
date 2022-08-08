import React, {useContext, useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom"
import "./login.css"
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {useDispatch} from "react-redux";
import {loginFailure, loginStart, loginSuccess} from "../../redux/userSlice";
import {persistor} from "../../redux/store";
import {changeResultDone} from "../../redux/resultSlice";
import {changeStart} from "../../redux/startSlice";
import {changeLanguage, changePickedLanguage} from "../../redux/languageSlice";
let waiting = false
const Login = () => {

    const [loginError, setLoginError] = useState(false)
    const [loginLoading, setLoginLoading] = useState(false)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch(loginStart())
        try {
            setLoginLoading(true)
            const res = await axios.post("/auth/login", {username, password})
            dispatch(loginSuccess(res.data))
            setLoginLoading(false)
            dispatch(changeResultDone(false))
            navigate("/")

        } catch(err) {
            console.log(err)
            dispatch(loginFailure())
            setLoginLoading(false)
            setLoginError(true)


        }
    };

    return (
        <>
            <Navbar />
            <div className="login-outest-container">
                <div className="login-outer-container">
                    <h1 className="login-text">Login</h1>
                    <div className="login-form-fb"><div className="login-form-fb-text">Login using Facebook</div></div>
                    <div className="login-form-google"><div className="login-form-fb-text">Login using Google</div></div>
                    <div className="login-field">
                        <span className="login-prompt">Username:</span>
                        <input className="text-field" type="text" id="username" onChange={ e=> setUsername(e.target.value)} />
                    </div>
                    <div className="login-field">
                        <div className="password-field">
                            <span className="password-prompt">Password:</span>
                            <span className="password-prompt-forgot" >Forgot your password?</span>
                        </div>
                        <input className="text-field"  type="password" id="password" onChange={ e=> setPassword(e.target.value)}  />
                    </div>
                    <button disabled={loginLoading} className="login-button" onClick={handleLogin} >Login</button>
                    {loginError&& <span>Login error!</span>}
                    <div className="hr"></div>
                    <span className="account-prompt">Don't have an account? <span className="account-prompt-join">Join.</span></span>
                </div>


            </div>
            <Footer />
        </>



    );
};

export default Login;