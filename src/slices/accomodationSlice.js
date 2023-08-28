import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";

const accomodationSlice = createSlice({
    name: 'accomodation',
    initialState: {
        men: 0,
        women: 0,
        minor: 0,
        isminorgirl: false,
        guardian: 0,
        guardiantext: '',
        rate: 200,
        totalperson: 0,
        totalcost: 0,
        checkin: null,
        checkout: null,
        days: 0,
        details: [{}]
    },
    reducers: {
        addPerson(state, actions) {
            let body = actions.payload;
            if (!(state[body.type] === 0 && body.value === -1)) {
                state[body.type] += body.value;
            }
            if (state.minor > 0) {
                if (state.minor <= 10 && !state.isminorgirl) {
                    state.guardian = 1;
                    state.guardiantext = ''
                } else if (state.minor <= 10 && state.isminorgirl) {
                    state.guardian = 2;
                    state.guardiantext = '(1 M and 1 F)'
                } else if (state.minor > 10 && state.isminorgirl) {
                    state.guardian = 2;
                    state.guardiantext = '(1 M and 1 F)'
                } else if (state.minor > 10 && !state.isminorgirl) {
                    state.guardian = 2;
                    state.guardiantext = ''
                }
            } else {
                state.guardian = 0;
                state.guardiantext = '';
            }
            state.totalperson = (state.men + state.women + state.minor + state.guardian);
            state.totalcost = (state.days > 0) ? state.rate * state.totalperson * state.days : 0;
        },
        setgirlminor(state, actions) {
            state.isminorgirl = actions.payload.value;
            if (state.minor > 0) {
                if (state.minor <= 10 && !state.isminorgirl) {
                    state.guardian = 1;
                    state.guardiantext = ''
                } else if (state.minor <= 10 && state.isminorgirl) {
                    state.guardian = 2;
                    state.guardiantext = '(1 M and 1 F)'
                } else if (state.minor > 10 && state.isminorgirl) {
                    state.guardian = 2;
                    state.guardiantext = '(1 M and 1 F)'
                } else if (state.minor > 10 && !state.isminorgirl) {
                    state.guardian = 2;
                    state.guardiantext = ''
                }
            } else {
                state.guardian = 0;
                state.guardiantext = '';
            }
            state.totalperson = (state.men + state.women + state.minor + state.guardian);
            state.totalcost = (state.days > 0) ? state.rate * state.totalperson * state.days : 0;
        },
        setDate(state, actions) {
            state[actions.payload.type] = actions.payload.value;
            if (state.checkin && state.checkout) {
                let temp = state.checkout - state.checkin;
                state.days = (temp > 0) ? temp : 0;
            }
            state.totalcost = (state.days > 0) ? state.rate * state.totalperson * state.days : 0;
            // if(state.checkin && state.checkout){
            //     if(state.checkin > state.checkout){
            //         toast.error("CheckIn cannot be done after CheckOut")
            //     }
            // }
            // if(actions.payload.type == 'checkin'){
            //     state.checkin = actions.payload.value;
            // }
        },
        setDetail(state, actions) {
            if(actions.payload.person === 'clear'){
                state.details = [{}]
            }else if(actions.payload.person === 'update'){
                let data = actions.payload;
                state.details[data.personno] = data.value;
            }else{
                state.details.push({
                    person: actions.payload.person,
                    name: actions.payload.name,
                    phone: actions.payload.phone,
                    email: actions.payload.email,
                    aadhar: actions.payload.aadhar
                })
            }
            console.log("from redux")
            state.details.forEach((v,i,a)=>{
                console.log(v);
            })
        },
        clearAccomodation(state, actions){
            state.men = 0
            state.women = 0
            state.minor = 0
            state.isminorgirl = false
            state.guardian = 0
            state.guardiantext = ''
            state.rate = 100
            state.totalperson = 0
            state.totalcost = 0
            state.checkin = null
            state.checkout = null
            state.days = 0
            state.details = [{}]
        }
    }
})

export const { addPerson, setgirlminor, setDate, setDetail, clearAccomodation } = accomodationSlice.actions;
export default accomodationSlice.reducer;