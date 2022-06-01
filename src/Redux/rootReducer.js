import { combineReducers } from "redux";
import BasketReducer from './BasketReducer';
import AuthReducer from './AuthReducer';
import OrderReducer from './OrderReducer.js';
const rootReducer = combineReducers({
    basket: BasketReducer,
    order: OrderReducer,
    user: AuthReducer
})

export default rootReducer