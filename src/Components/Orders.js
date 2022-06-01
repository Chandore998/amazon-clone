import React from 'react';
import '../Styles/Orders.css';
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux';
import {Order_Empty} from '../Redux/Actions'

import Order from './Order';

function Orders() {
    const collectionOrder = useSelector((state) => state.order.order)
    const dispatch = useDispatch()

    const OrderEmpty = () =>{
        dispatch(Order_Empty())
    }

    return (
        <div className='orders'>
            <div className='order_heading'>
            <h1>Your Orders</h1>
            {collectionOrder.length !== 0 && <button onClick={ OrderEmpty}>clear order</button> }
            </div>

            {collectionOrder.length === 0 ?
             <div className="order_empty">
                 <h5>ORDER IS EMPTY</h5>
             </div> : 
             collectionOrder.map((items,index) =>{
               return  <Order key={index} order={items} />}
            )}
            
            
            
        </div>
    )
}

export default Orders
