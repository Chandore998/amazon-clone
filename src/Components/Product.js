import React from "react";
import {useDispatch} from 'react-redux';
import "../Styles/Product.css";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import {Add_into_basket} from '../Redux/Actions'



function Product(items) {
  const { title, price, rating, image} = {...items.items}
  const dispatch = useDispatch()

  const AddIntoBucket = () =>{
    dispatch(Add_into_basket(items.items))
  }

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {[1,2,3,4,5,].map((counter) => {
              return counter <= rating.rate ? 
              <StarRateIcon color="error"/> : <StarOutlineIcon/>
             })}
        </div>
      </div>

      <img src={image} alt="" />

      <button onClick ={AddIntoBucket}>Add to Basket</button>
    </div>
  );
}

export default Product;
