import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import LightModeIcon from '@mui/icons-material/LightMode';
import {faMoon} from "@fortawesome/free-solid-svg-icons"
import {  useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

import { AppBar, Avatar, Stack } from '@mui/material'
import { useTheme } from '../Context/ThemeContext'

function Navbar() {
const {setThemeType, themeType} = useTheme()
    const { authState} = useAuth();
    const navigate = useNavigate()
    return (
        <AppBar>
        <div className='header' style={{backgroundColor: themeType ? '#111111' : 'white', boxShadow: themeType && '2px 2px 10px 1px #2e2e2e'}}>
           
            <div onClick={() => navigate("/home")}
            style={{width:'200px', display:'flex', justifyContent:'center', alignItems:'center', border:'none'}}
            >
                {themeType ?  <img className='homelogo'src= "/NavbarLogoDark.png" alt="logo" style={{display:'block', margin:'auto', width:'100px', height:'60px'}}></img> : <img className='homelogo' style={{display:'block', margin:'auto', width:'90px', height:'50px'}} src= "/NavbarLogoLight.png" alt=""></img>}
           
            </div>
           
            <div className='headericon'>
                {
                    themeType ? <LightModeIcon onClick={() => setThemeType((prev) => !prev)} sx={{ fontSize:'40px'}}/> : <FontAwesomeIcon icon={faMoon} onClick={() => setThemeType((prev) => !prev)} style={{paddingTop:'5px', color:'black'}}/> 
                    
                }
            
            <Stack>
                <Avatar src={`${authState?.user?.displayProfile}`}  onClick={() => { navigate(`/profile/${authState?.user?.username}`)}}/>
                </Stack>
            </div>
        </div>
        </AppBar>
    )
}

export default Navbar
