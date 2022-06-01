import React from "react";
import {useNavigate} from 'react-router-dom';
import "../Styles/Subtotal.css";
import {auth} from './firebase'
import TotalAmount from './TotalAmount'


function Subtotal({items}) {
  const navigate = useNavigate()
  console.log(auth.currentUser)
  const handleCheckOut = () =>{
    auth.currentUser === null ? navigate('/logIn',{state:'check'}) : navigate('/addressselect') 
  }
  return (
    <div className="subtotal">
      <TotalAmount/>
      {items.length > 0 && <button onClick={handleCheckOut }>Proceed to Checkout</button>}
    </div>

  );  
}

export default Subtotal;


