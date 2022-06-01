import React, { useState , useRef} from 'react';
import '../Styles/signup.css'
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Signup() {
    const history = useNavigate();
    const passwordref = useRef();
    const [userName , setUserName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage , setErrorMessage] = useState(false)
    const [changePasswordType , setChangePasswordType] = useState(false)


    const register = event => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
                history('/')
             }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode)
                    console.log(errorMessage)})
    }
    const handleMobilenumber = (event) =>{
        if(event.target.value.slice(-1).match(/[0-9]/) || event.target.value === ''){
            (event.target.value.length <= 10 && setMobileNumber( event.target.value))
            }
    }

    const handlePassword = (event) =>{
        setPassword(event.target.value)
        if(event.target.value.length < 6 ) {
            setErrorMessage(true)
        }
        else{setErrorMessage(false)}
    }

    const handleChangePassword = () =>{

        if(changePasswordType){
            setChangePasswordType(false)
            passwordref.current.type='password'
        }
        else{
            setChangePasswordType(true)
            passwordref.current.type = 'text';
        }
        
    }

    return (
        <div className='signup'>
            <Link to='/'>
                <img
                    className="signup__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                    alt='amazom'
                />
            </Link>

            <div className='signup__container'>
                <h1>Create Account</h1>

                <form onSubmit={register}>
                    <h5>Your name</h5>
                    <input type='text' value={userName} onChange={e => setUserName(e.target.value)} required  />

                    <h5>Mobile number</h5>
                    <input type='number' value={mobileNumber} onChange={handleMobilenumber} required  />

                    <h5>Email</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} required  />

                    <h5>Password</h5>
                    <input type='password' ref={passwordref} value={password} placeholder='at least 6 character' onChange={handlePassword} />
                    <div className='password_change' onClick={handleChangePassword}>
                        {changePasswordType ?  <VisibilityIcon/> : <VisibilityOffIcon/>}
                    </div>
                    
                    {errorMessage &&  <p>Passwords must be at least 6 characters.</p>}
                       
                    <button type='submit' className='signup__signInButton'>Continue</button>
                </form>
                <span>
                    We will send you a text to verify your phone.
                    Message and Data rates may apply.
                </span>
                <span>
                     You have already Account  
                     <Link to='/Login' className='ms-2'>Login</Link>
                </span>
            </div>
        </div>
    )
}

export default Signup
