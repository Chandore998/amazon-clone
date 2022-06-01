
            /*  Basket Action  */ 

export const Add_into_basket = (data) =>{
        return {
            type:'ADD_INTO_BASKET',
            payload: data
}
}
export const Remove_items_basket = (data) =>{
    return {
        type:'REMOVE_FROM_BASKET',
        payload: data
    }
}

export  const Empty_basket = () =>{
    return {
        type: 'EMPTY_BASKET'
    }
}


                /* Address Action */ 

export const Add_into_address = (data) =>{
        return {
            type: 'ADD_INTO_ADDRESS',
            payload: data
        }
}

                /* Order Action */

export const Add_into_order = (data) =>{
    return {
        type: 'ADD_INTO_ORDER',
        payload: data
    }
}

export const Order_Empty = () =>{
    return {
        type: 'EMPTY_ORDER'
    }
}


            /* user Action */

export const Get_User = ()=>{
    return{
        type: 'USER_LOGIN',
        payload: true
    }
 }


export const Remove_User = () =>{
    return{
        type: 'USE_lOGOUT',
        payload: false

    }
}
