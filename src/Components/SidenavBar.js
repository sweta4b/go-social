import { faArrowRightFromBracket, faBookmark, faHouseUser, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useTheme } from '../Context/ThemeContext';
import CreatePost from './CreatePost';



function SidenavBar() {
     const {themeType} = useTheme()
    const {userLogout} = useAuth();
    const navigate = useNavigate();
    const [textColor, setTextColor] = useState('')
    const [showModal, setShowModal] = useState(false);



   useEffect(() => {
    themeType ? setTextColor('white') : setTextColor('black')
   })
    

    const getStyles = ({ isActive }) => ({
        
        color: isActive ? '#d62b70' : textColor,
        textDecoration: 'none'
      });
    return (
        <>
        {showModal && (
            <CreatePost showModal={showModal} setShowModal={setShowModal} />
        )}
        <div>
        <div className='sidenav'>
            <ul className='navlist' style={{color: themeType ? 'white' : 'black'}}>
                <li style={{display:'flex',gap:'10px'}}><NavLink to="/home" style={getStyles}>  <FontAwesomeIcon icon={faHouseUser} /> Home</NavLink></li>
                <hr/>
                <li style={{display:'flex',gap:'10px'}}><NavLink to="/explore"style={getStyles}><FontAwesomeIcon icon={faSnowflake} /> Explore</NavLink></li>
                <hr/>
                <li style={{display:'flex',gap:'10px'}}><NavLink to="/bookmark"style={getStyles}><FontAwesomeIcon icon={faBookmark} /> Bookmark</NavLink></li>
                <hr/>
                <li style={{marginLeft:'10px', cursor:'pointer', paddingRight:'10px'}} onClick = {() => {userLogout(); navigate("/")}}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout</li>
                <hr/>
                <li onClick={() => setShowModal(true)} style={{marginLeft:'5px', cursor:'pointer', paddingTop:'10px'}}><AddCircleOutlineIcon sx={{fontSize:'17px'}}/> Create Post</li>
            </ul>
        </div>
        </div>
        </>
    )
}

export default SidenavBar
