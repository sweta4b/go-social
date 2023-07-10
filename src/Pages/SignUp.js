import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuth } from '../Context/AuthContext';
import { useTheme } from '../Context/ThemeContext';

function SignUp() {
    const { userSignup } = useAuth()
    const { themeType } = useTheme()
    const [showPassword, setShowPassword] = useState(false)


    const [userCredentials, setUserCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmpassword: "",
        displayProfile: "https://res.cloudinary.com/da5x335p3/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1687947257/Avatar/pngtree-cute-girl-avatar-is-available-for-commercial-use-png-image_678746_ybjypy.jpg"
    });


    const signUpHandler = (event) => {
        event.preventDefault();
        if (userCredentials.password === userCredentials.confirmpassword) {
            userSignup(userCredentials)
        } else {
            toast.warn("Password Mismatch")
        }
    }

    return (
        <div className='signupcontainer' >
            <div style={{
                backgroundImage: themeType ? `url("SocialLogoDark.png")` : `url("SocialLogo.png")`,
                width: '500px',
                height: '500px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                display: 'block',
                margin: 'auto'
            }}></div>
            <div id="login-box" style={{ backgroundColor: themeType ? '#111111' : 'white' }}>
                <div className="left">
                    <h1>Sign up</h1>
                    <form onSubmit={signUpHandler}>
                        <input
                            required
                            type="text"
                            name="firstName"
                            placeholder="Firstname"
                            value={userCredentials.firstName}
                            onChange={(event) => setUserCredentials((userCredentials) => ({ ...userCredentials, firstName: event.target.value }))}
                            style={{ backgroundColor: themeType ? "#111111" : 'white', color: themeType && 'white' }} />

                        <input
                            required
                            type="text"
                            name='lastName'
                            placeholder="Lastname"
                            value={userCredentials.lastName}
                            onChange={(event) => setUserCredentials((userCredentials) => ({ ...userCredentials, lastName: event.target.value }))}
                            style={{ backgroundColor: themeType ? "#111111" : 'white', color: themeType && 'white' }} />

                        <input
                            required
                            type="text"
                            name="email"
                            placeholder="E-mail"
                            value={userCredentials.email}
                            onChange={(event) => setUserCredentials((userCredentials) => ({ ...userCredentials, email: event.target.value }))}
                            style={{ backgroundColor: themeType ? "#111111" : 'white', color: themeType && 'white' }} />

                        <input
                            required
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={userCredentials.username}
                            onChange={(event) => setUserCredentials((userCredentials) => ({ ...userCredentials, username: event.target.value }))}
                            style={{ backgroundColor: themeType ? "#111111" : 'white', color: themeType && 'white' }} />

                        <input
                            required
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={userCredentials.password}
                            onChange={(event) => setUserCredentials((userCredentials) => ({ ...userCredentials, password: event.target.value }))}
                            style={{ backgroundColor: themeType ? "#111111" : 'white', color: themeType && 'white' }} />

                        <input
                            required
                            type={showPassword ? 'text' : 'password'} name="confirmpassword"
                            placeholder="Confirm password" value={userCredentials.confirmpassword}
                            onChange={(event) => setUserCredentials((userCredentials) => ({ ...userCredentials, confirmpassword: event.target.value }))}
                            style={{ backgroundColor: themeType ? "#111111" : 'white', color: themeType && 'white' }} />

                        <label >
                            <input type="checkbox" onChange={() => setShowPassword(!showPassword)} /> {showPassword ? 'Hide Password' : 'Show Password'}
                        </label>

                        <input type="submit" value="Sign me up" style={{ marginTop: '10px' }} />
                    </form>
                    <Link to="/" style={{ display: 'block' }}>Have an account? Log in</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
