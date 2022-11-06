import axios from 'axios';

import {
    FETCH_CART_SUCCESS,
    PERFUME_ADDED_TO_CART_SUCCESS,
    PERFUME_REMOVED_FROM_CART_SUCCESS,
    LOADING_CART
} from "../utils/constants/actions-types";
import {API_BASE_URL} from "../utils/constants/url";

export const fetchCart = () => async (dispatch) => {
    dispatch({
        type: LOADING_CART
    })

    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/job/" + localStorage.getItem("email"),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    dispatch({
        type: FETCH_CART_SUCCESS,
        payload: response.data
    })
};

export const addToCart = (perfume, history) => async (dispatch) => {
    await axios({
        method: "POST",
        url: API_BASE_URL + "/job/add",
        data: perfume,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })

    dispatch({
        type: PERFUME_ADDED_TO_CART_SUCCESS,
    })

    history.push("/job")
};

export const removeFromCart = (perfume) => async (dispatch) => {
    const response = await axios({
        method: "POST",
        url: API_BASE_URL + "/job/remove",
        data: perfume,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    dispatch({
        type: PERFUME_REMOVED_FROM_CART_SUCCESS,
        payload: response.data
    })
};
