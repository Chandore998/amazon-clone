import React from 'react';
import '../Styles/index.css'
import {useNavigate} from 'react-router-dom';
const NotFound = () =>{
    const navigate = useNavigate()
    return (
        <div className="notFound">
             <h2>ERROR</h2>
             <h4>404</h4>
             <button onClick={() => window.history.back()}>Go back</button>
             <button onClick={() => navigate('/')}>Go to home</button>
        </div>  
    )
    
}


export default NotFound;