import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMoon} from "@fortawesome/free-solid-svg-icons"
import {  useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { Avatar, Stack } from '@mui/material'

function Navbar() {
    const {userLogout, authState} = useAuth();
    const navigate = useNavigate()
    return (
        <div className='header'>
            <div onClick={() => navigate("/")}>
            <img className='homelogo' src="Logo 1 Used By 2.3 Million Startups.png" alt=""></img>
            </div>
            <div className='headericon'>
            <FontAwesomeIcon icon={faMoon}/>
            <Stack>
                <Avatar src={`${authState?.user?.displayProfile}`}  onClick={() => { navigate(`/profile/${authState?.user?.username}`)}}/>
                </Stack>
            </div>
        </div>
    )
}

export default Navbar
