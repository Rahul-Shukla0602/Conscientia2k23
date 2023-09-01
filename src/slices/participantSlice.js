import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Team :localStorage.getItem('Team')?JSON.parse(localStorage.getItem('Team')):null,
    editTeam:false,
    number: localStorage.getItem('number')?JSON.parse(localStorage.getItem('number')):0
}

const participantSlice = createSlice({
    name: 'participant',
    initialState:initialState,
    reducers:{
        setParticipant(state,actions){
            state.number = actions.payload
        },
        setTeam(state,actions){
            localStorage.setItem('Team', JSON.stringify(actions.payload)); // Make sure actions.payload is not null
            state.Team = actions.payload
            console.log(localStorage.getItem('Team'))
            console.log('paylaod',actions.payload);
        },
        setEditTeam(state,actions){
            state.editTeam = actions.payload
        },
        resetEventState(state,actions){
            state.step = 1
            state.Team = null
            state.editTeam = false
          },
    }
})

export const {setParticipant,setEditTeam,setTeam,resetEventState} = participantSlice.actions
export default participantSlice.reducer
