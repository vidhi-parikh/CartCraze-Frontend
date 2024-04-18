import axios from 'axios'
import { remote_config } from '../config/remoteURL.js';


import { PRODUCT_LIST_REQUEST, 
         PRODUCT_LIST_SUCCESS, 
         PRODUCT_LIST_FAIL, 
         PRODUCT_DETAILS_REQUEST, 
         PRODUCT_DETAILS_SUCCESS, 
         PRODUCT_DETAILS_FAIL, 
         PRODUCT_DELETE_REQUEST,
         PRODUCT_DELETE_SUCCESS,
         PRODUCT_DELETE_FAIL,
         PRODUCT_CREATE_REQUEST,
         PRODUCT_CREATE_SUCCESS,
         PRODUCT_CREATE_FAIL,
         PRODUCT_CREATE_RESET
        }     
        from "../constants/productConstants.js";



export const ListProducts = (searchKeyword='', sortByPrice) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST})
        console.log(searchKeyword)
        const {data} = await axios.get(`${remote_config.BACKEND_URL}/api/products?keyword=${searchKeyword}&price=${sortByPrice}`);
        dispatch ({
            type: PRODUCT_LIST_SUCCESS,  
            payload: data 
        })
    } catch(error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.message ? error.response.data.message : error.message 
        })
    }
}


export const listProductDetails = (id) => async (dispatch) => {

    // console.log('inside product details reducers');
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        console.log('sending api request')
        const {data} = await axios.get(`${remote_config.BACKEND_URL}/api/products/${id}`);
        console.log('sent api request')
        dispatch ({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data 
        })
    } catch(error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.message ? error.response.data.message : error.message 
        })
    }
}


export const deleteProduct = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })
        const {
            userLogin : {userInfo},
        } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`${remote_config.BACKEND_URL}/api/products/${id}`, config)
        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })
    }
    catch(error){
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.message ? error.response.data.message : error.message 
        })
    }
}

export const createProduct = (productName, productCategory, productImage,productBrand,productPrice, productDescription,countInStock) => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })
        const {
            userLogin : {userInfo},
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        const {data} =  await axios.post(`${remote_config.BACKEND_URL}/api/products`,{
            productName,
            productCategory,
            productImage,
            productBrand,
            productPrice,
            productDescription,
            countInStock
        }, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.message ? error.response.data.message : error.message 
        })
    }
}