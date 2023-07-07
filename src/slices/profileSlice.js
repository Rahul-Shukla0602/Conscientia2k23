import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
    loading:false
}

const profileslice = createSlice({
    name:'profile',
    initialState: initalState,
    reducers:{
        setUser(state,actions){
            state.user = actions.payload;
        },
        setLoading(state, actions) {
            state.loading = actions.payload;
        },
    }
});

export const {setUser,setLoading} = profileslice.actions;
export default profileslice.reducer;