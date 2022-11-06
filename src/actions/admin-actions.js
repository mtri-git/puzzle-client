import axios from 'axios';

import {
    PERFUME_ADDED_SUCCESS,
    PERFUME_UPDATED_SUCCESS,
    PERFUME_ADDED_FAILURE,
    PERFUME_UPDATED_FAILURE,
    FETCH_USER_SUCCESS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_COMPANYS_SUCCESS,
    FETCH_ALL_USERS_ORDERS_SUCCESS, FORM_RESET
} from "../utils/constants/actions-types";
import { API_BASE_URL } from "../utils/constants/url";

const BASE_REST_API_URL = 'https://puzzle-ute.herokuapp.com/api/jobPost/api';

class CompanyService {

    getAllCompanys() {
        return axios.get(BASE_REST_API_URL + "/company")
    }

    createCompany(company) {
        return axios.post(BASE_REST_API_URL + "/admin/add-company", company)
    }

    getCompanyById(companyId) {
        return axios.get(BASE_REST_API_URL + '/admin/get-one-company/' + companyId);
    }

    getCompanyByKeyWordAndStatus(keyword, status) {
        return axios.get(BASE_REST_API_URL + '/search?' + 'keyword=' + keyword + '&status=' + status);
    }

    updateCompany(company) {
        return axios.put(BASE_REST_API_URL + '/admin/update-info-company', company);
    }

    deleteCompany(companyId) {
        return axios.delete(BASE_REST_API_URL + '/company/' + companyId);
    }

}

export const CompanyServiceIml = new CompanyService();


export class EmployerService {

    getAllEmployers() {
        return axios.get(BASE_REST_API_URL + "/account")
    }

    createEmployer(account) {
        return axios.post(BASE_REST_API_URL + "/admin/add-compan", account)
    }

    getEmployerById(accountId) {
        return axios.get(BASE_REST_API_URL + '/employer/' + accountId);
    }

    getEmployerByKeyWordAndStatus(keyword, status) {
        return axios.get(BASE_REST_API_URL + '/search?' + 'keyword=' + keyword + '&status=' + status);
    }

    updateEmployer(account) {
        return axios.put(BASE_REST_API_URL + '/admin/update-info-account', account);
    }

    deleteEmployer(accountId) {
        return axios.delete(BASE_REST_API_URL + '/account/' + accountId);
    }

}

export const EmployerServiceIml = new EmployerService();

export class AccountService {

    getAllAccounts() {
        return axios.get(BASE_REST_API_URL + "/admin/get-all-account")
    }

    createAccount(employer) {
        return axios.post(BASE_REST_API_URL + "/admin/add-account", employer)
    }

    getAccountById(employerId) {
        return axios.get(BASE_REST_API_URL + '/' + employerId);
    }

    getAccountByKeyWordAndStatus(keyword, status) {
        return axios.get(BASE_REST_API_URL + '/search?' + 'keyword=' + keyword + '&status=' + status);
    }

    updateAccount(employer) {
        return axios.put(BASE_REST_API_URL + '/admin/update-account/', employer);
    }

    deleteAccount(employerId) {
        return axios.delete(BASE_REST_API_URL + '/admin/delete-account/' + employerId);
    }

}
export const AccountServiceIml = new AccountService();


export const addCompany = (data) => async (dispatch) => {
    try {
        const response = await axios({
            method: "POST",
            url: API_BASE_URL + "/admin/Company/add",
            data: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        dispatch({
            type: PERFUME_ADDED_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: PERFUME_ADDED_FAILURE,
            payload: error.response.data
        })
    }
};

export const fetchAllCompanys = () => async (dispatch) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/company",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    dispatch({
        type: FETCH_ALL_COMPANYS_SUCCESS,
        payload: response.data
    })
};

export const updateCompany = (data) => async (dispatch) => {
    try {
        const response = await axios({
            method: "POST",
            url: API_BASE_URL + "/admin/Company/add",
            data: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        dispatch({
            type: PERFUME_ADDED_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: PERFUME_ADDED_FAILURE,
            payload: error.response.data
        })
    }
};

export const addPerfume = (data) => async (dispatch) => {
    try {
        const response = await axios({
            method: "POST",
            url: API_BASE_URL + "/admin/add",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        dispatch({
            type: PERFUME_ADDED_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: PERFUME_ADDED_FAILURE,
            payload: error.response.data
        })
    }
};

export const updatePerfume = (data, history) => async (dispatch) => {
    try {
        const response = await axios({
            method: "PUT",
            url: API_BASE_URL + "/admin/edit",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        history.push("/account");

        dispatch({
            type: PERFUME_UPDATED_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: PERFUME_UPDATED_FAILURE,
            payload: error.response.data
        })
    }
};

export const fetchAllUsersOrders = () => async (dispatch) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/admin/orders",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    dispatch({
        type: FETCH_ALL_USERS_ORDERS_SUCCESS,
        payload: response.data
    })
};

export const fetchAllUsers = () => async (dispatch) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/admin/user/all",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    dispatch({
        type: FETCH_ALL_USERS_SUCCESS,
        payload: response.data
    })
};

export const fetchUser = (id) => async (dispatch) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/admin/user/" + id,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    dispatch({
        type: FETCH_USER_SUCCESS,
        payload: response.data
    })
};

export const formReset = () => async (dispatch) => {
    dispatch({
        type: FORM_RESET
    })
};
