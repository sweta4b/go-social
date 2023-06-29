import React from 'react'
import { Link} from 'react-router-dom'
import { useAuth } from '../Context/AuthContext';

function SignUp() {
    const {userCredentials, userSignup, setUserCredentials} = useAuth()


    const signUpHandler = (event) => {
       event.preventDefault();
        if(
            !userCredentials.firstName.trim() ||
            !userCredentials.lastName.trim() ||
            !userCredentials.email.trim() ||
            !userCredentials.password.trim() ||
            !userCredentials.username.trim() 
        ){
            console.log("Enter all crendentials")
        }else {
            userSignup(userCredentials)
        }
    }

    return (
        <div className='signupcontainer'>
            <div id="login-box">
                <div class="left">
                    <h1>Sign up</h1>
                    <form onSubmit={signUpHandler}>
                   <input type="text" name="firstName" placeholder="Firstname" value={userCredentials.firstName} onChange = {(event) => setUserCredentials((prev) => ({...prev, firstName: event.target.value}))}/>
                   <input type="text" name='lastName' placeholder="Lastname" value={userCredentials.lastName} onChange= {(event) => setUserCredentials((prev) => ({...prev, lastName: event.target.value}))} />
                    <input type="text" name="email" placeholder="E-mail" value={userCredentials.email} onChange={(event) => setUserCredentials((prev) => ({...prev, email: event.target.value}))}/>
                    <input type="text" name="username" placeholder="Username" value={userCredentials.userName} onChange = {(event) => setUserCredentials((prev) => ({...prev, username: event.target.value}))}/>
                    <input type="password" name="password" placeholder="Password" value={userCredentials.password} onChange={(event) => setUserCredentials((prev) => ({...prev, password: event.target.value}))} />
                    <input type="submit" value="Sign me up"/>
                    </form>
                    <Link to="/" style={{display:'block'}}>Have an account? Log in</Link>
                </div>
                {/* <div  className='sociallogo'>
    <img src="Screenshot 2023-06-22 at 18-40-53 Logo Maker Used By 2.3 Million Startups.png"/>
  </div> */}

            </div>
        </div>
    )
}

export default SignUp
