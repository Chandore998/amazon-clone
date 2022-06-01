import React, { useState, useRef } from 'react';
import '../Styles/Login.css'
import { Link, useNavigate, useLocation} from "react-router-dom";
import { auth } from "./firebase";
import {signInWithEmailAndPassword} from 'firebase/auth'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useDispatch} from 'react-redux';
import {Get_User} from '../Redux/Actions'


function Login(){

    const history = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()
    const passwordref = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [changePasswordType , setChangePasswordType] = useState(false)

    console.log()

    //  login credential method

    const handleSignIn = event => {
        event.preventDefault();
        signInWithEmailAndPassword(auth,email, password)
            .then((userCredential) => {
                dispatch(Get_User())
                if(location.state === '/'){
                    history('/')
                }
                else if(location.state === 'check'){
                    history('/addressselect')
                }
                else{
                    history('/Checkout')
                }
                 
            })
            .catch(error => alert(error.message))
    }


    // Alter type of input of password 
    
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
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                    alt='amazon'
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form  onSubmit={handleSignIn} >
                    <h5>E-mail</h5>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} required  />

                    <h5>Password</h5>
                    <input type='password' ref={passwordref} value={password} onChange={e => setPassword(e.target.value)} />
                    <div className='password_changes' onClick={handleChangePassword}>
                        {changePasswordType ?  <VisibilityIcon/> : <VisibilityOffIcon/>}
                    </div>  
                    <button type='submit'  className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={() => history('/Signup')} className='login__registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
