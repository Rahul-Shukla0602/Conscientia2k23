import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    botnumber: localStorage.getItem('botnumber')?JSON.parse(localStorage.getItem('botnumber')):1
}

const botSlice = createSlice({
    name: 'bot',
    initialState:initialState,
    reducers:{
        setBot(state,actions){
            state.botnumber = actions.payload
        },
        // setTeam(state,actions){
        //     localStorage.setItem('Team', JSON.stringify(actions.payload)); // Make sure actions.payload is not null
        //     state.Team = actions.payload
        //     console.log(localStorage.getItem('Team'))
        //     console.log('paylaod',actions.payload);
        // },
        // setEditTeam(state,actions){
        //     state.editTeam = actions.payload
        // },
        resetbotState(state,actions){
            state.botnumber = 1
        },
    }
})

export const {setBot,resetbotStat} = botSlice.actions
export default botSlice.reducer
