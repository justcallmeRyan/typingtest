import React from "react";
import {BrowserRouter, Routes, Route, useNavigate, Navigate} from "react-router-dom";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import About from "../pages/about/About";
import Leaderboard from "../pages/leaderboard/Leaderboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile/:name" element={<Profile/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/leaderboard" element={<Leaderboard/>}/>>
                <Route exact path="/profile" element={<Navigate replace to="/"/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;