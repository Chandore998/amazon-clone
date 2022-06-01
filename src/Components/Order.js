import React from 'react'
import '../Styles/Order.css'
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";


function Order({ order }) {
    const {orderId, deliverOrderDate, presetOrderDate,totalItems,totalAmounts} = {...order}
    return ( 
        <div className='order'>
             <h2>Order</h2>
             <p><span style={{fontSize: '16px', fontWeight: 600}}>Order Date: </span>{presetOrderDate}</p>
             <p><span style={{fontSize: '16px', fontWeight: 600}}>Delivery Date: </span>{deliverOrderDate}</p>
             <p className="order__id">
                 <small>{orderId}</small>
                 
             </p>
             {totalItems.map( items => (
                 <CheckoutProduct key={items.id} item={items} option={false}/>
             ))}
            <CurrencyFormat
                renderText={(value) => (
                    <h3 className="order__total">Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={totalAmounts}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />   
        </div>
    )
}

export default Order
