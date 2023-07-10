
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext';
import { useTheme } from '../Context/ThemeContext';

function Login() {
    const navigate = useNavigate();
    const { userLogin } = useAuth();
    const { themeType } = useTheme();

    const [userData, setUserData] = useState({
        username: "",
        password: ""
    })

    const testUser = {
        username: "adarshbalika",
        password: "adarshbalika123"
    }

    const loginHandler = () => {
        if (!userData.username.trim() || !userData.password.trim()) {
            console.log("Enter all credentials")
        } else {
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
                <div style={{
                    backgroundImage: themeType ? `url("SocialLogoDark.png")` : `url("SocialLogo.png")`,
                    width: '500px',
                    height: '500px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    display: 'block',
                    margin: 'auto'
                }}></div>

                <div className='loginform'>
                    <h1 style={{ marginTop: '20px' }}>Login</h1>
                    <input
                        type="text"
                        name="email"
                        placeholder="username"
                        id="loginemail"
                        value={userData.username}
                        onChange={(event) => setUserData((prev) => ({ ...prev, username: event.target.value }))}
                        style={{ backgroundColor: themeType ? "#111111" : 'white', color: themeType && 'white' }} />

                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        id="password"
                        value={userData.password}
                        onChange={(event) => setUserData((prev) => ({ ...prev, password: event.target.value }))}
                        style={{ backgroundColor: themeType ? "#111111" : 'white', color: themeType && 'white' }} />

                    <button id="button" onClick={loginHandler}>Login</button>
                    <button id="button" onClick={testLoginHandler}>Guest Login</button>
                    <Link to="/signup">New User? Sign Up</Link>
                </div>

            </div>
        </>
    )
}

export default Login
