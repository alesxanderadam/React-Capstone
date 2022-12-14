import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
import { history } from '../../App';
import { PageConstant } from '../../Commons/page.constant';
import { ACCESS_TOKEN, getStoreJson, http, saveStore, saveStoreJson, USER_LOGIN, USER_PROFILE } from '../../util/config';

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
        },
        editProfileAciton: (state, action) => {
            state = action.payload
        }
    }
});

export const { loginAction, getProfileAction, editProfileAciton } = loginReducer.actions

export default loginReducer.reducer

export const loginApi = (userLogin) => {
    return async dispatch => {
        http.post('/api/Users/signin', userLogin).then((res) => {
            const action = loginAction(res.data.content)
            dispatch(action)
            saveStoreJson(USER_LOGIN, res.data.content);
            saveStore(ACCESS_TOKEN, res.data.content.accessToken);
            const actionGetProfile = getProfileApi();
            dispatch(actionGetProfile);
            history.push(`${PageConstant.profile}`);
        }).catch((err) => {
            message.error(`${err.response.data.message}`)
        })
    }
}

export const getProfileApi = () => {
    return async dispatch => {
        await http.post('/api/Users/getProfile').then((res) => {
            const action = getProfileAction(res.data.content)
            dispatch(action);
            saveStoreJson(USER_PROFILE, res.data.content);
            window.location.reload();
        }).catch((err) => {
            console.log(err)
        })

    }
}

export const editProfileApi = (editProfile) => {
    return async dispatch => {
        await http.post('/api/Users/updateProfile', editProfile).then((res) => {
            const action = editProfileAciton(res.data.content);
            dispatch(action);
            message.success("Update success");
        }).catch((err) => {
            message.error(`${err.response.data.content}`);
            return;
        })
    }
}