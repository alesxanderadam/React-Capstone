import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
import { history } from '../../App';
import { PageConstant } from '../../Commons/page.constant';
import { ACCESS_TOKEN, getStoreJson, http, saveStore, saveStoreJson, USER_LOGIN, USER_PROFILE } from '../../util/config';

const initialState = {
    Login: getStoreJson(USER_LOGIN) ? getStoreJson(USER_LOGIN) : null,
    Profile: getStoreJson(USER_PROFILE) ? getStoreJson(USER_PROFILE) : null,
}

const loginReducer = createSlice({
    name: 'loginReducer',
    initialState,
    reducers: {
        loginAction: (state, aciton) => {
            state.Login = aciton.payload
            saveStoreJson(USER_LOGIN, aciton.payload);
            saveStore(ACCESS_TOKEN, aciton.payload.accessToken);
            history.push(`${PageConstant.profile}`);
        },
        getProfileAction: (state, action) => {
            state.Profile = action.payload
            saveStoreJson(USER_PROFILE, action.payload);
        },
        editProfileAciton: (state, action) => {
            state.Profile = action.payload
        },
        deleteIdProductAction: (state, action) => {
            state.Profile = action.payload
        },
        loginFacebookAction: (state, action) => {
            state = action.payload
        }
    }
});

export const { loginAction, getProfileAction, editProfileAciton, deleteIdProductAction, loginFacebookAction } = loginReducer.actions

export default loginReducer.reducer

export const loginApi = (userLogin) => {
    return async dispatch => {
        try {
            const result = await http.post('/api/Users/signin', userLogin)
            return dispatch(loginAction(result.data.content))
        } catch (err) {
            message.error(`${err.response.data.message}`)
        }
    }
}

export const getProfileApi = () => {
    return async dispatch => {
        try {
            const result = await http.post('/api/Users/getProfile')
            return dispatch(getProfileAction(result.data.content))
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const editProfileApi = (editProfile) => {
    return async dispatch => {
        await http.post('/api/Users/updateProfile', editProfile).then((res) => {
            const action = editProfileAciton(res.data.content);
            dispatch(action);
            dispatch(getProfileApi())
            message.success("Update success");
        }).catch((err) => {
            message.error(`${err.response.data.content}`);
            return;
        })
    }
}

export const deleteIdProductApi = (id) => {
    return async dispatch => {
        await http.post('/api/Users/deleteOrder', id).then((res) => {
            const action = deleteIdProductAction();
            dispatch(action);
            const getProfileAction = getProfileApi()
            dispatch(getProfileAction)
            message.success("Delte Succses");
        }).catch((err) => {
            message.error(`${err.response.data.content}`);
            return;
        })
    }
}

export const loginFacebookApi = (accessToeken) => {
    return async dispatch => {
        await http.post('/api/Users/facebooklogin', accessToeken).then((res) => {
            const action = loginFacebookAction(res.data.content)
            dispatch(action)
            message.success("Delte Succses");
        }).catch((err) => {
            return;
        })
    }
}