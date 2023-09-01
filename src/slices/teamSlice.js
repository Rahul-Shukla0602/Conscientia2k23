import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  Team1: localStorage.getItem('Team')?JSON.parse(localStorage.getItem('Team')):null,
  editTeam: false,
  paymentLoading: false,
}

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, actions) => {
      state.Team1 = actions.payload
    },
    setEditTeam: (state, actions) => {
      state.editTeam = actions.payload
    },
    setPaymentLoading: (state, actions) => {
      state.paymentLoading = actions.payload
    }
  },
})

export const {
  setTeam,
  setEditTeam,
  setPaymentLoading,
} = teamSlice.actions

export default teamSlice.reducer