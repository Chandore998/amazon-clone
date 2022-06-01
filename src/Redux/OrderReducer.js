const InitialState = {
    order:[],
    address:[]
}

const orderReducer = ( state=InitialState , action) =>{
    switch(action.type){
        case 'ADD_INTO_ADDRESS':
            return {...state, address: state.address.concat(action.payload)}
        case 'ADD_INTO_ORDER':
            return {...state ,order:state.order.concat(action.payload)};
        case 'EMPTY_ORDER':
            return {...state, order:[]}
        default:
            return state
    }
}

export default orderReducer;