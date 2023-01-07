import { createSlice } from '@reduxjs/toolkit'
import { number } from 'yup/lib/locale';
import { http } from '../../util/config';
const initialState = {
    arrProd: [
        {
            productId: '',
            quantity: 0
        },
    ],
    email: ''
}

const cartReduce = createSlice({
    name: "cartReduce",
    initialState,
    reducers: {
        orderProductAction: (state, action) => {
            state.arrProd.push({
                productId: action.payload.id,
                quantity: action.payload.quantity
            })
            state.email = action.payload.email
        }
    }
});

export const { orderProductAction } = cartReduce.actions

export default cartReduce.reducer

export const orderProductApi = (product, email) => {
    // return async dispatch => {
    //     try{
    //         const result = http.post(`/api/Users/order`,product, email)
    //         console.log((result.data.content))
    //         return dispatch(orderProductAction(result.data.content));
    //     }catch(err){
    //         console.log("hih",err)
    //         return;
    //     }
    // }
}

