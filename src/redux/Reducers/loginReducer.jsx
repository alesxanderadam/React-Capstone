import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
import axios from 'axios';
import { ACCESS_TOKEN, getStore, getStoreJson, saveStore, saveStoreJson, USER_LOGIN, USER_PROFILE } from '../../util/login.localstorage';

const initialState = {
    Login: getStoreJson(USER_LOGIN),
    Profile: getStoreJson(USER_PROFILE),
}

const loginReducer = createSlice({
    name: 'loginReducer',
    initialState,
    reducers: {
        loginAction: (state, aciton) => {
            state.Login = aciton.payload
        },
        getProfileAction: (state, action) => {
            state.Profile = action.payload
        }
    }
});

export const { loginAction, getProfileAction } = loginReducer.actions

export default loginReducer.reducer
export const loginApi = (userLogin) => {
    return async dispatch => {
        const res = await axios({
            url: 'https://shop.cyberlearn.vn/api/Users/signin',
            method: 'post',
            data: userLogin
        })
        const action = loginAction(res.data.content)
        dispatch(action)
        saveStoreJson(USER_LOGIN, res.data.content);
        saveStore(ACCESS_TOKEN, res.data.content.accessToken);
        const actionGetProfile = getProfileApi();
        dispatch(actionGetProfile)
    }
}

export const getProfileApi = () => {
    return async dispatch => {
        const res = await axios({
            url: 'https://shop.cyberlearn.vn/api/Users/getProfile',
            method: 'POST',
            headers: {
                Authorization: ` Bearer ${getStore(ACCESS_TOKEN)} `
            }
        })
        const action = getProfileAction(res.data.content)
        dispatch(action)
        saveStoreJson(USER_PROFILE, res.data.content);
    }
}