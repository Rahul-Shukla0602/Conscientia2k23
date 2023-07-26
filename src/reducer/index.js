import {combineReducers} from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import profileReducer from '../slices/profileSlice'
import eventReducer from '../slices/eventSlice'
import cartReducer from '../slices/cartSlice'
const rootReducer = combineReducers({
    auth: authReducer,
    profile : profileReducer,
    event:eventReducer,
    cart: cartReducer
})
export default rootReducer;
