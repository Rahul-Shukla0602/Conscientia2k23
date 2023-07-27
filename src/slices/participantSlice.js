import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast"


const participantSlice = createSlice({
    name: 'participant',
    initialState: {
        number: 0,
    },
    reducers: {
        setParticipant(state,actions){
            state.number = actions.payload
        }
    }
})

export const {setParticipant} = participantSlice.actions;
export default participantSlice.reducer;