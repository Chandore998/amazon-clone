
const InitialState = {
    basket:[],
}

const basketReducer = (state = InitialState , action) =>{
    switch(action.type){
        case 'ADD_INTO_BASKET':
            return {...state, basket: state.basket.concat(action.payload) };
        case 'REMOVE_FROM_BASKET':
            return {...state, basket: state.basket.filter(item => item.id !== action.payload)}
        case 'EMPTY_BASKET':
           return  {basket:[]}

        default:
            return state;
    }

}


export default basketReducer