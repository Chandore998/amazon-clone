import React,{useEffect, useState, useCallback}  from 'react';
import '../Styles/Payment.css';
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import CheckoutProduct from './CheckoutProduct';
import { v4 as uuidv4 } from 'uuid';
import {Add_into_order,Empty_basket} from '../Redux/Actions'

const  Payment = () => {
    const [proCode , setProCode] = useState('');
    const [specailDiscount , setSpecialDiscount] = useState(0);
    const [deliveryDate ,setdeliveryDate] = useState('');
    const [errorPromo , setErrorPromo] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const basket = useSelector(state => state.basket.basket)
    const address = useSelector(state => state.order.address)
    
    useEffect(() =>{
            setdeliveryDate(date(3))
    },[deliveryDate])

   

    const date = (availableDay = 0) =>{
        let deliveryDate = new Date();
        let dd = String(deliveryDate.getDate() + availableDay).padStart(2, '0');
        let mm = String(deliveryDate.getMonth() + 1).padStart(2, '0'); 
        let yyyy = deliveryDate.getFullYear();
        deliveryDate = dd + '-' + mm + '-' + yyyy;
        return deliveryDate
    }
    
    function total_items_amount(){
       let totalsum = 0;
        totalsum = basket.reduce((sum ,item) =>{
            return sum = sum + item.price
        },0)
        return parseFloat(totalsum).toFixed(2)
    }
 
    const handleproCode = (event) =>{
        if(event.target.value.length <= 6){
            setProCode(event.target.value)
        }
    }

    const checkproCode = () =>{
        if(proCode === 'amZ101'){
            setSpecialDiscount(60);
            setProCode('')
            setErrorPromo(false)
        }
        else{
            setErrorPromo(true)
        }
    }

    const totalAmount = useCallback(() =>{
        let total_items = total_items_amount() 
        let discount = 70
        return total_items + discount + specailDiscount 
        },[specailDiscount])

    const handleOrder = () =>{
        const currentDate = date();
        const generateOrder = {
                orderId: uuidv4(),
                presetOrderDate: currentDate,
                deliverOrderDate: deliveryDate,
                totalItems: basket,
                totalAmounts: totalAmount()
        }
        dispatch(Add_into_order(generateOrder));
        navigate('/');
        dispatch(Empty_basket());
    }

    return (
        <>
            <Link to='/'>
                <img
                    className="amazon__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                    alt='amazon'
                />
            </Link>
            <div className='payment'>
            <div className='left_payment'>
                <h4>Review your order</h4>
                    <div className='payment__container'>
                        <div className=''>
                            <h6>Shipping address</h6>
                            {address.map((items) => 
                                    <ul style={{padding: '0px'}}>
                                        <li>{items.apartment}</li>
                                        <li>{items.city}</li>
                                        <li>{items.state}</li>
                                        <li>{items.pincode}</li>
                                        <li><span>Phone: </span>{items.mobile}</li>
                                    </ul>)
                                }
                        </div>
                        <div className='payment_promocode'>
                            <p>Gift cards, Voucher & Promotional codes</p>
                            <input type="text" placeholder='Enter Code' value={proCode}  onChange={handleproCode}/>
                            <button onClick={checkproCode}>Apply</button>
                           {errorPromo && <p style={{color:'red'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info" viewBox="0 0 16 16">
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                                Please Enter valid Promo Code</p>
                            }
                        </div>
                    </div>
                    <div className='payment__product_container' >
                        <h3>Delivery date : {deliveryDate}</h3>
                        {basket.map(items =>  <CheckoutProduct key={items.id} item={items} option={false} /> )}
                    </div>
            </div>
            
            <div  className='order_summary'>
                <button onClick={handleOrder}>Place your order</button>
                <p>Order Summary</p>
                <ul style={{padding: '0px'}}>
                    <li><span>Items:</span> <span>${total_items_amount()}</span></li>
                    <li><span>Delivery:</span> <span>$70.00</span></li>
                    <li><span>Total:</span> <span>${parseFloat(total_items_amount() + parseFloat(70.00)).toFixed(2)}</span></li>
                    <li><span>Promotion Applied:</span><span>${specailDiscount}</span></li>
                    <hr />
                    <li className='payment_total'>
                        <span>Order Total:</span>
                        <span>${parseFloat(totalAmount()).toFixed(2)}</span></li>
                    <hr />
                </ul>
            </div>
        </div>

        </>
        
    )
}

export default Payment;
