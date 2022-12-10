import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    arrProduct: [
        { id: 1, name: 'product1', image: 'https://i.pravatar.cc?u=1', price: 1000 },
        { id: 2, name: 'product2', image: 'https://i.pravatar.cc?u=2', price: 2000 },
    ],
}

const productReducer = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        getAllProductApi: (state, action) => {
            state.arrProduct = action.payload;
        },
    }
});

export const { getAllProductApi } = productReducer.actions

export default productReducer.reducer

// 
export const getProductApi = () => {
    return async (dispatch) => {
        const res = await axios({
            url: 'https://shop.cyberlearn.vn/api/product',
            method: 'GET'
        });
        const action = getAllProductApi(res.data.content)
        dispatch(action)
    }
}