import { createSlice } from "@reduxjs/toolkit";


const participantSlice = createSlice({
    name: 'participant',
    initialState: {
        Team :localStorage.getItem('Team')?JSON.parse(localStorage.getItem('Team')):null,
        editTeam:false,
        number: localStorage.getItem('number')?JSON.parse(localStorage.getItem('number')):0,
    },
    reducers: {
        setParticipant(state,actions){
            state.number = actions.payload
        },
        setTeam: (state, actions) => {
            state.Team = actions.payload
        },
        setEditTeam:(state,actions)=>{
            state.editTeam = actions.payload
        },
        resetEventState: (state) => {
            state.step = 1
            state.Team = null
            state.editTeam = false
          },
    }
})

export const {setParticipant,setEditTeam,setTeam,resetEventState} = participantSlice.actions;
export default participantSlice.reducer;