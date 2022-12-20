import axios from "axios";
import { isExpired } from "react-jwt";
import { history } from "../App";
import { PageConstant } from "../Commons/page.constant";

export const ACCESS_TOKEN = "accessToken";
export const USER_LOGIN = "userLogin";
export const USER_PROFILE = "userProfile";

export const { saveStore, saveStoreJson, getStore, getStoreJson, removeStore } = {
    saveStore: (name, stringValue) => {
        localStorage.setItem(name, stringValue);
        return stringValue
    },
    saveStoreJson: (name, value) => {
        let JsonValue = JSON.stringify(value);
        localStorage.setItem(name, JsonValue)
        return JsonValue;
    },
    getStore: (name) => {
        if (localStorage.getItem(name)) {
            return localStorage.getItem(name)
        }
        return null;
    },
    getStoreJson: (name) => {
        if (localStorage.getItem(name)) {
            return JSON.parse(localStorage.getItem(name));
        }
        return null
    },
    removeStore: (name) => {
        localStorage.removeItem(name)
    }
}

const Token_Cybersoft = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3MyIsIkhldEhhblN0cmluZyI6IjE5LzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NDQ1NDQwMDAwMCIsIm5iZiI6MTY1OTg5MTYwMCwiZXhwIjoxNjg0NjAyMDAwfQ.49m9-EoDr6zr7UOk_79hfcvJWKI_s0Wy_g40ossfl9c'
export const http = axios.create({
    baseURL: 'https://shop.cyberlearn.vn',
    timeout: 20000
})

http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        Authorization: ` Bearer ${getStore(ACCESS_TOKEN)} `,
        TokenCybersoft: Token_Cybersoft
    }
    return config;
}, (err) => {
    return Promise.reject(err)
})

http.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if (err.resspone?.status === 401 || err.resspone?.status === 403) {
        const isMyTokenExpried = isExpired(getStore(ACCESS_TOKEN))
        console.log(isMyTokenExpried)
        if (isMyTokenExpried) {
            alert("Phiên đăng nhập hết hạn")
            removeStore(ACCESS_TOKEN)
            removeStore(USER_LOGIN)
            removeStore(USER_PROFILE)
            window.location.href = `${PageConstant.login}`
        }
        history.push('/')
    }
    return Promise.reject(err)
})
