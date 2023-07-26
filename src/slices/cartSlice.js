import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast"


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
                let valobj = JSON.parse(JSON.stringify(val))
                let payloadobj = JSON.parse(JSON.stringify(actions.payload))
                if(valobj.id === payloadobj.id && valobj.size === payloadobj.size){
                    toast.error("Item already added to cart")
                    isAlready = true;
                }
            })
            if(!isAlready){
                state.items.push(actions.payload);
                state.totalitems += 1;
                state.totalamount += actions.payload.rate;
                toast.success("Item added successfully")
            }
        },
        increasequantity(state,actions){
            // console.log(actions.payload)
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
                    if(i!==actions.payload.index){
                        temp.push(v)
                    }
                })
                state.items = temp;
            }
            state.totalamount -= actions.payload.rate;
            state.totalitems -= 1;
        },
        clearCart(state,actions){
            state.totalamount = 0;
            state.totalitems = 0;
            state.items = [];
        }
    }
})

export const {addtocart,increasequantity,decreasequnatity,clearCart} = cartSlice.actions;
export default cartSlice.reducer;