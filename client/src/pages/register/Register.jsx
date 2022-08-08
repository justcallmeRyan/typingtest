import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar";
import "./register.css"
import Footer from "../../components/Footer/Footer";


const Register = () => {
    const [username, setUsername] = useState("")
    const [writeErr, setWriteErr] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/auth/register", {username, email, password})
            navigate("/login")

        } catch (err) {
            console.log(err)
            setWriteErr(true)
        }
    }
    return (
        <>
            <Navbar />
            <div className="register-container">
                <div className="register-inner-frame">
                    <div className="form-header">Join Keyboard</div>
                    <div className="form-already"> Already have an account? <span>Log in</span></div>
                    <div className="form-fb"><div className="form-fb-text">Join using Facebook</div></div>
                    <div className="form-google"><div className="form-fb-text">Join using Google</div></div>
                    <div className="register-form">
                        <div>
                            <div>Username:</div>
                            <input onChange={e=>setUsername(e.target.value)} type="text"/>
                        </div>
                        <div>
                            <div>Email:</div>
                            <input onChange={e=>setEmail(e.target.value)} type="email"/>
                        </div>
                        <div>
                            <div>Password:</div>
                            <input required={true} onChange={e=>setPassword(e.target.value)} type="password"/>
                        </div>

                    </div>
                    <button className="form-join" onClick={handleRegister}> <span>Join</span></button>
                    {writeErr&& <span>Username or email already used</span>}
                </div>
            </div>
            <Footer />
        </>

    );
};

export default Register;


// <div className="form-container">
//     <form className="form">
//         <input onChange={e=>setUsername(e.target.value)} type="text" className="input" placeholder="User name"/>
//         <input onChange={e=>setEmail(e.target.value)} type="email" className="input" placeholder="Email"/>
//         <input onChange={e=>setPassword(e.target.value)} type="password" className="input" placeholder="Paswword"/>
//         <button onClick={handleRegister}>Register</button>
//     </form>
// </div>