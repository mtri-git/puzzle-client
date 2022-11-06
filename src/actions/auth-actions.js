import axios from 'axios';

import {
    LOGIN_SUCCESS,
    FORM_RESET,
    REGISTER_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_FAILURE,
    LOGOUT_SUCCESS,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    ACTIVATE_ACCOUNT_SUCCESS,
    ACTIVATE_ACCOUNT_FAILURE,
    RESET_PASSWORD_CODE_SUCCESS,
    RESET_PASSWORD_CODE_FAILURE,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE
} from "../utils/constants/actions-types";
import { API_BASE_URL } from "../utils/constants/url";

function cutInformation(start, end, string) {
    let indexStart = string.indexOf(start) + start.length;
    let indexEnd = string.indexOf(end);
    return string.substring(indexStart, indexEnd);
}

function setRole(roles) {
    if (roles.find(role => role === 'ADMIN'))
        return 'ADMIN';
    else if (roles.find(role => role === 'EMPLOYER'))
        return 'EMPLOYER';
    else if (roles.find(role => role === 'CANDIDATE'))
        return 'CANDIDATE';
    else
        return 'USER';
};

export const login = (data, history) => async (dispatch) => {
    try {
        const response = await axios.post(API_BASE_URL + "/login", data);
        if (response.data.status === 200) {

            let inforUser = response.config.data.replaceAll("\"", "");
            localStorage.setItem("email", cutInformation("email:", ",", inforUser));
            localStorage.setItem("token", response.data.data.jwt);
            localStorage.setItem("userRole", setRole(response.data.data.roles));
            localStorage.setItem("isLoggedIn", true);
        }

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })

        history.push("/account");
        window.location.reload();
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response.data
        })
    }
};

export const registration = (data) => async (dispatch) => {
    try {
        const response = await axios({
            method: "POST",
            url: API_BASE_URL + "/user",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response.data
        })
    }
};

export const logout = () => async (dispatch) => {
    localStorage.clear();

    dispatch({
        type: LOGOUT_SUCCESS
    })
};

export const activateAccount = (code) => async (dispatch) => {
    try {
        const response = await axios.get(API_BASE_URL + "/activate/" + code);

        dispatch({
            type: ACTIVATE_ACCOUNT_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ACTIVATE_ACCOUNT_FAILURE,
            payload: error.response.data
        })
    }
};

export const forgotPassword = (data) => async (dispatch) => {
    try {
        const response = await axios.post(API_BASE_URL + "/forgot", data);

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAILURE,
            payload: error.response.data
        })
    }
};

export const fetchResetPasswordCode = (code) => async (dispatch) => {
    try {
        const response = await axios.get(API_BASE_URL + "/reset/" + code);

        dispatch({
            type: RESET_PASSWORD_CODE_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_CODE_FAILURE,
            payload: error.response.data
        })
    }
};

export const resetPassword = (data, history) => async (dispatch) => {
    try {
        const response = await axios.post(API_BASE_URL + "/reset", data);

        history.push("/login");

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAILURE,
            payload: error.response.data
        })
    }
};

export const formReset = () => async (dispatch) => {
    dispatch({
        type: FORM_RESET,
    })
};



