import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
import axios from 'axios';
import { getStoreJson, PRODUCT_CARD, saveStore, saveStoreJson, TOTAL_QUATITY, http, removeStore } from '../../util/config';
import { getProfileApi } from './loginReducer';

const productCartCheck = () => {
    if (getStoreJson(PRODUCT_CARD)) {
        return getStoreJson(PRODUCT_CARD)
    }
    return [];
}

const quatityCheck = () => {
    if (getStoreJson(TOTAL_QUATITY)) {
        return getStoreJson(TOTAL_QUATITY)
    }
    return 0;
}

const initialState = {
    arrProduct: [
        { id: 1, name: 'product1', image: 'https://i.pravatar.cc?u=1', price: 1000 },
        { id: 2, name: 'product2', image: 'https://i.pravatar.cc?u=2', price: 2000 },
    ],
    productDetail: [],
    productCart: productCartCheck(),
    totalAmount: 0,
    quantity: quatityCheck(),
    productsFavorite: [],
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
        updateTotalCart: (state, action) => {
            state.quantity = action.payload;
        },
        addProductToCartAction: (state, action) => {
            // Check if item exist
            const isExisted = state.productCart?.find(item => item.id === action.payload.id);
            // plus 1 product
            state.quantity++;
            saveStore(TOTAL_QUATITY, state.quantity)
            if (!isExisted) {
                state.productCart?.push({
                    ...action.payload,
                    quantity: 1,
                })
                saveStoreJson(PRODUCT_CARD, [...state.productCart])
            }
            else {
                isExisted.quantity++;
                isExisted.totalPrice = Number(isExisted.totalPrice) + Number(action.payload.price)
                saveStoreJson(PRODUCT_CARD, [...state.productCart])
            }
            //  Calculate the total amount of the products in the cart
            state.totalAmount = state.productCart?.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            )
        },
        orderProductAction: (state, action) => {
            state.productCart.push({
                productId: action.payload.id,
                quantity: action.payload.quantity
            })
            removeStore(PRODUCT_CARD)
            removeStore(TOTAL_QUATITY)
        },
        getListProductSearchAction: (state, action) => {
            state.keyword = action.payload
        },
        getListProductSearchByPriceAction: (state, action) => {
            const FindProductByPrice = state.keyword.filter(arrProduct => arrProduct.price === action.payload)
            state.keyword = FindProductByPrice
        },
        getproductfavoriteAction: (state, action) => {
            state.productsFavorite = action.payload
        },
        updateProductCartAfterDeleteAction: (state, action) => {
            state.productCart = action.payload
        },
    }
});

export const { getAllProductApi, getProductByIdAction, addProductToCartAction, updateTotalCart, getListProductSearchAction, getListProductSearchByPriceAction, getproductfavoriteAction, updateProductCartAfterDeleteAction, productsUserLikeAction, orderProductAction } = productReducer.actions

export default productReducer.reducer

export const updateCartTotal = (product, number) => {
    return async (dispatch) => {
        try {
            dispatch(updateTotalCart(product, number))

        }
        catch (error) {
            console.log(error)
        }
    }
}
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

export const orderProductApi = (product) => {
    return async dispatch => {
        try {
            const result = await http.post(`/api/Users/order`, product)
            dispatch(orderProductAction(result.data.content))
            dispatch(getProfileApi())
            message.loading("Vui lòng chờ xử lý")
            setTimeout(() => {
                window.location.reload()
            }, 1200)
        } catch (err) {
            return;
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

export const getproductfavoriteApi = () => {
    return async dispatch => {
        try {
            const result = await http.get(`/api/Users/getproductfavorite`)
            const action = getproductfavoriteAction(result.data.content)
            dispatch(action)
        } catch (err) {
            console.log(err)
            return;
        }
    }
}

export const updateProductCartAfterDeleteApi = (arrayProduct) => {
    return async dispatch => {
        dispatch(updateProductCartAfterDeleteAction(arrayProduct))
    }
}

export const productsUserLikeApi = (idProduct) => {
    return async dispatch => {
        try {
            const result = await http.get(`/api/Users/like?productId=${idProduct}`)
            message.success(`${result.data.message}`)
        } catch (err) {
            message.error(`${err.content}`)
        }
    }
}
