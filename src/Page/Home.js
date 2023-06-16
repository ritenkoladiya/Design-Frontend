import React, { useState } from 'react'
import component from '../Component'
import { BiLogIn, BiKey, BiUser, IoBagOutline } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { FiBook } from "react-icons/fi";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { AiOutlineMenuUnfold, AiOutlineMenuFold, AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from './Dashboard';
import Login from './Login';
import Sideandnav from './Sideandnav';

const Home = () => {


    return (
        <>
            <div>
                <Sideandnav />
                <div>
                    <Router>
                        <Routes>
                            <Route path='/login' element={<Login />} />
                        </Routes>
                    </Router>
                </div>
            </div>
        </>
    )
}

export default Home