import React from "react";
import "../Styles/Checkouts.css";
import {useSelector, useDispatch} from 'react-redux';
import {Add_into_basket} from '../Redux/Actions'
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from './Subtotal.js';
import TotalAmount from "./TotalAmount";

const Checkouts = ()  => {
  const dispatch = useDispatch()
  const allItems = useSelector((state) => state.basket.basket);
  
  window.onbeforeunload = function(){
    localStorage.setItem('basket',JSON.stringify([...allItems]))

  }

  window.onload = function(){
    dispatch(Add_into_basket(JSON.parse(localStorage.getItem('basket'))))
    localStorage.clear()
  }
  return (
    <div className="checkout">
      <div className="checkout__left"> 
        <div>
          {/* <h3>Hello, {user?.email}</h3> */}
          <h2 className="checkout__title">Your shopping Basket</h2>
          {allItems.map(items => <CheckoutProduct key={items.id} item={items} option={true}/>)}
        </div>
        <div className="checkout__price">
            <TotalAmount/>
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal items={allItems} />
      </div>

    </div>
  );
}

export default Checkouts;
