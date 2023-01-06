import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { http } from '../../util/config';

const productCartCheck = () => {
    if (JSON.parse(localStorage.getItem('productCart')) === null) {
        return []
    }
    return JSON.parse(localStorage.getItem('productCart'))
}

const initialState = {
    arrProduct: [
        { id: 1, name: 'product1', image: 'https://i.pravatar.cc?u=1', price: 1000 },
        { id: 2, name: 'product2', image: 'https://i.pravatar.cc?u=2', price: 2000 },
    ],
    productDetail: [],
    productCart: productCartCheck(),
    totalAmount: 0,
    quantity: 0
}

const productReducer = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        getAllProductApi: (state, action) => {
            state.arrProduct = action.payload;
        },
        getProductByIdAction: (state, action) => {
            state.productDetail = action.payload;
        },
        addProductToCartAction: (state, action) => {

            // Check if item exist
            const isExisted = state.productCart?.find(item => item.id === action.payload.id);
            // plus 1 product
            state.quantity++;
            if (!isExisted) {
                state.productCart?.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    image: action.payload.image,
                    price: action.payload.price,
                    quantity: 1,
                    totalPrice: action.payload.price,
                })
            }
            else {
                isExisted.quantity++;
                isExisted.totalPrice = Number(isExisted.totalPrice) + Number(action.payload.price)
            }

            //  Calculate the total amount of the products in the cart
            state.totalAmount = state.productCart?.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            )
        },
        getListProductSearchAction: (state, action) => {
            state.keyword = action.payload
        },
        getListProductSearchByPriceAction: (state, action) => {
            const FindProductByPrice = state.keyword.filter(arrProduct => arrProduct.price === action.payload)
            state.keyword = FindProductByPrice
        }
    }
});

export const { getAllProductApi, getProductByIdAction, addProductToCartAction, getListProductSearchAction, getListProductSearchByPriceAction } = productReducer.actions

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
// Async function to call product by id
export const getProductByIdApi = (id) => {
    return async (dispatch) => {
        try {
            const result = await axios({
                url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
                method: 'GET'
            });
            dispatch(getProductByIdAction(result.data.content))
        }
        catch (error) {
            console.log(error)
        }
    }
}
export const getAddingCartProduct = (product) => {
    return async (dispatch) => {
        try {
            dispatch(addProductToCartAction(product))
        }
        catch (error) {
            console.log(error)
        }
    }
}

export const getListProductSearchApi = (keyword) => {
    return async dispatch => {
        const result = await http.get(`/api/Product?keyword=${keyword}`)
        const action = getListProductSearchAction(result.data.content)
        dispatch(action)
    }
}

export const getListProductSearchByPriceApi = (price) => {
    return async (dispatch) => {
        const action = getListProductSearchByPriceAction(price)
        dispatch(action)
    }
}

