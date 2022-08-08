import React, {useEffect, useState} from 'react';
import useFetch from "../../hooks/useFetch";
import {useSearchParams, useLocation, useNavigate} from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./profile.css"
import UpdateUser from "../../components/UpdateUser/UpdateUser";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/userSlice";
let name = [];
let userSince = "";
let highestScoreEnglish = 0;
let highestScoreRussian = 0;


const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state=>state.user)
    const location = useLocation()

    const path = location.pathname.split("/")[2]
    console.log(path)
    const [array, setArray] =  useState([])


    const {data,loading,error,reFetch} =  useFetch("/users/user/" + path)
    console.log(data)
    useEffect(() => {
        setArray(data)
        name = array[0]
        userSince = array[1]
        highestScoreEnglish = array[2]
        highestScoreRussian = array[3]

    })

    function handleLogout() {
        navigate("/")
        dispatch(logout())

    }

    return (
            <>
                <Navbar />
                <div className="profile-outer-container">
                    <div className="profile-sidebar-container">
                        {currentUser.username===path&&
                        <div className="profile-sidebar">
                            <div className="sidebar-item">
                                <img src="/userblack.svg" />
                                <span>My profile</span>
                            </div>
                            <div className="sidebar-item sidebar-item-unpicked">
                                <img src="/bar-chart-black.svg" />
                                <span>My stats</span>
                            </div>
                            <div className="sidebar-item sidebar-item-unpicked">
                                <img src="/settingsblack.svg" />
                                <span>My settings</span>
                            </div>
                            <div className="sidebar-item sidebar-item-unpicked">
                                <img src="/lineblack.svg" />
                            </div>
                            <div onClick={handleLogout} className="sidebar-item sidebar-item-unpicked">
                                <img src="/powerblack.svg" />
                                <span>Log out</span>
                            </div>
                        </div>}
                    </div>

                    <div className="profile-info">
                        <img className="big-profile-img" src="/userprofile.svg" />
                        <div className="user-info">
                            {loading? "Loading" :
                                (
                                    error? "User does not exist" :
                                        <div className="user-details-column">
                                            <span className="user-nickname">{name}</span>
                                            <span>Member since: {userSince?.slice(0,10)}</span>
                                            <span>English highest score: {highestScoreEnglish}</span>
                                            <span>Russian highest score: {highestScoreRussian}</span>
                                        </div>
                                )
                            }
                        </div>
                    </div>

                </div>
                <Footer />
            </>
        );
};

export default Profile;