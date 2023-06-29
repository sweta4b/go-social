
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext';

function Login() {
    const navigate = useNavigate();
    const{userLogin} = useAuth();

    const [userData, setUserData] = useState({
        username:"",
        password:""
    })

    const testUser = {
        username:"adarshbalika",
        password:"adarshbalika123"
    }

    const loginHandler = () => {
        if(!userData.username.trim() || !userData.password.trim()){
            console.log("Enter all credentials")
        }else{
            userLogin(userData)
        }
    };


    const testLoginHandler = () => {
        setUserData(testUser);
        userLogin(testUser);
        navigate("/home")
    };


    return (
        <>
            <div className='logincontainer'>
                <div className='applogo'>
                    <img src="undraw_Social_life_re_x7t5 (2).png" alt="">
                    </img>
                    <img className='logotitle' src="Screenshot 2023-06-22 at 15-42-37 Logo Maker Used By 2.3 Million Startups.png" alt=""/>
                </div>

                <div className='loginform'>
                    <h1 style={{ marginTop: '20px' }}>Login</h1>
                    <input type="text" name="email" placeholder="username" id="loginemail" value={userData.username}  onChange={(event)=> setUserData((prev) => ({...prev, username: event.target.value}))}/>
                    <input type="password"  name='password' placeholder='Password' id="password" value={userData.password} onChange={(event) => setUserData((prev) => ({...prev, password: event.target.value}))}/>
                    <button id="button" onClick={loginHandler}>Login</button>
                    <button id="button" onClick={testLoginHandler}>Guest Login</button>
                    <Link to="/signup">New User? Sign Up</Link>
                </div>

            </div>
        </>
    )
}

export default Login
