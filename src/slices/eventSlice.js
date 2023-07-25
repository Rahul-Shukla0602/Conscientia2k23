import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  event: null,
  editEvent: false,
  paymentLoading: false,
}

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setEvent: (state, action) => {
      state.event = action.payload
    },
    setEditEvent: (state, action) => {
      state.editEvent = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetEventState: (state) => {
      state.step = 1
      state.event = null
      state.editEvent = false
    },
  },
})

export const {
  setStep,
  setEvent,
  setEditEvent,
  setPaymentLoading,
  resetEventState,
} = eventSlice.actions

export default eventSlice.reducer