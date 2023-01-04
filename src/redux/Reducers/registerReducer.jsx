import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { act } from '@testing-library/react';
import { result } from 'lodash';

const initialState = {
    item:{
        message:"",
    }
}

const registerReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    resUserAPI: (state,action) => {
        state.item = action.payload
    },
  }
});

export const {resUserAPI} = registerReducer.actions

export default registerReducer.reducer

//call APi
export const resUserApii =(item)=>{
    return async (dispatch2) => {
        try{
            const result = await axios({
                url:'https://shop.cyberlearn.vn/api/Users/signup',
                method:'POST',
                data: item
            });
            console.log(result);
        }
        catch (err){
            console.log(err)
        }
    }
}