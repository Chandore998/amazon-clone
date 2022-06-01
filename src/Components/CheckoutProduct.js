import React from 'react';
import '../Styles/CheckoutProduct.css';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import {useDispatch} from 'react-redux';
import {Remove_items_basket} from '../Redux/Actions';


function CheckoutProduct({item,option}) {
    const {id,image,price,rating,title} = {...item};
    const dispatch = useDispatch()

    const removeCheckoutProduct = () =>{
        dispatch(Remove_items_basket(id))
    }

    return (
        <div className='checkoutProduct'>
             <img className='checkoutProduct__image' src={image} alt="loading"/>

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div>
                {[1,2,3,4,5,].map((counter) => {
                     return counter <= rating.rate ? 
                    <StarRateIcon color="error"/> : <StarOutlineIcon/>
                    })} 
                </div>
                { option && <button onClick={removeCheckoutProduct}>Remove from Basket</button>}
                
            </div>
        </div>
    )
}

export default CheckoutProduct
