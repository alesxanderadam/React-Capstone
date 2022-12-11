import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './Reducers/loginReducer';
import productReducer from './Reducers/productReducer';

export const store = configureStore({
    reducer: {
        productReducer: productReducer,
        loginReducer: loginReducer,
    }
})