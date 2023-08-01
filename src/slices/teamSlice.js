import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  Team: null,
  editTeam: false,
  paymentLoading: false,
}

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, actions) => {
      state.Team = actions.payload
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