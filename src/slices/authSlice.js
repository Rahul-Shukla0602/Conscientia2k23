import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    signupData:null,
    loading: false,
    token : localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null,
}

const authslice = createSlice({
    name:'auth',
    initialState: initalState,
    reducers:{
        setToken(state,actions){
            state.token = actions.payload;
        },
        setSignupData(state, actions) {
            state.signupData = actions.payload;
        },
        setLoading(state, actions) {
            state.loading = actions.payload;
        },
    }
});

export const {setToken,setLoading,setSignupData} = authslice.actions;
export default authslice.reducer;