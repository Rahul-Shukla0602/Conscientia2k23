import {combineReducers} from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import profileReducer from '../slices/profileSlice'
// import eventReducer from '../slices/eventSlice'
const rootReducer = combineReducers({
    auth: authReducer,
    profile : profileReducer,
    // event:eventReducer
})
export default rootReducer;
