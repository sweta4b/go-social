import { faArrowRightFromBracket, faBookmark, faHouseUser, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import CreatePost from './CreatePost';



function SidenavBar() {

    const {userLogout} = useAuth();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const getStyles = ({ isActive }) => ({
        color: isActive ? '#d62b70' : "rgb(53,52,51)",
        textDecoration: 'none'
      });
    return (
        <>
        {showModal && (
            <CreatePost showModal={showModal} setShowModal={setShowModal} />
        )}
        <div>
        <div className='sidenav'>
            <ul className='navlist'>
                <li><NavLink to="/home" style={getStyles}>  <FontAwesomeIcon icon={faHouseUser} /> Home</NavLink></li>
                <li><NavLink to="/explore"style={getStyles}><FontAwesomeIcon icon={faSnowflake} /> Explore</NavLink></li>
                <li><NavLink to="/bookmark"style={getStyles}><FontAwesomeIcon icon={faBookmark} /> Bookmark</NavLink></li>
                <li style={{marginLeft:'10px', cursor:'pointer'}} onClick = {() => {userLogout(); navigate("/")}}><FontAwesomeIcon icon={faArrowRightFromBracket} />Logout</li>
                <li onClick={() => setShowModal(true)} style={{cursor:'pointer'}}><AddCircleOutlineIcon/>Create Post</li>
            </ul>
        </div>
        </div>
        </>
    )
}

export default SidenavBar
