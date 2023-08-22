import {combineReducers} from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import profileReducer from '../slices/profileSlice'
import eventReducer from '../slices/eventSlice'
import cartReducer from '../slices/cartSlice'
import participantReducer from '../slices/participantSlice'
import teamReducer from '../slices/teamSlice'
import accomodationReducer from '../slices/accomodationSlice'
const rootReducer = combineReducers({
    auth: authReducer,
    profile : profileReducer,
    event:eventReducer,
    cart: cartReducer,
    participant:participantReducer,
    team:teamReducer,
    accomodation: accomodationReducer
})
export default rootReducer;
