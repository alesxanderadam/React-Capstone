import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
import { history } from '../../App';
import { PageConstant } from '../../Commons/page.constant';
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
            message.success('tạo tài khoản thành công')
            history.push(`${PageConstant.login}`);
        }
        catch (err) {
            message.error(`${err.response.data.message}`)
        }
    }
}