import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
import { http } from '../../util/config';

const initialState = {
    item: {
        message: "",
    }
}

const registerReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        resUserAPI: (state, action) => {
            state.item = action.payload
        },
    }
});

export const { resUserAPI } = registerReducer.actions

export default registerReducer.reducer

export const resUserApii = (item) => {
    return async (dispatch2) => {
        try {
            const result = await http.post('/api/Users/signup', item)
            message.success(`${result.content}`)
        }
        catch (err) {
            message.error(`${err.response.data.message}`)
        }
    }
}