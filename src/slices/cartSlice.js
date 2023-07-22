import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        totalitems: 0,
        totalamount: 0,
        items: []
    },
    reducers: {
        addtocart(state,actions){
            // console.log(actions.payload);
            let isAlready = false;
            state.items.forEach((val,i)=>{
                if(JSON.stringify(val)===JSON.stringify(actions.payload)){
                    alert("Item already added to cart")
                    isAlready = true;
                }
            })
            if(!isAlready){
                state.items.push(actions.payload);
                state.totalitems += 1;
                state.totalamount += actions.payload.rate;
                alert("Item added successfully")
            }
        },
        increasequantity(state,actions){
            console.log(actions.payload)
            state.items[actions.payload.index].qty += 1;
            state.totalamount += actions.payload.rate;
            state.totalitems += 1;
        },
        decreasequnatity(state,actions){
            if(state.items[actions.payload.index].qty > 1){
                state.items[actions.payload.index].qty -= 1;
            }else{
                let temp = []
                state.items.forEach((v,i)=>{
                    if(i!=actions.payload.index){
                        temp.push(v)
                    }
                })
                state.items = temp;
            }
            state.totalamount -= actions.payload.rate;
            state.totalitems -= 1;
        }
    }
})

export const {addtocart,increasequantity,decreasequnatity} = cartSlice.actions;
export default cartSlice.reducer;