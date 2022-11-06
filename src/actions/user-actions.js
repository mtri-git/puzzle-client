import axios from 'axios';

import {
    USER_UPDATED_SUCCESS,
    USER_ADDED_REVIEW_SUCCESS,
    USER_ADDED_REVIEW_FAILURE
} from "../utils/constants/actions-types";
import {API_BASE_URL} from "../utils/constants/url";

const BASE_REST_API_URL = 'https://puzzle-ute.herokuapp.com/api';
// const BASE_REST_API_URL = 'https://puzzle-ute.herokuapp.com/api';
class JobPostService {

    getAllJobPosts() {
        return axios.get(BASE_REST_API_URL + "/job-post/get-all")
    }

    createJobPost(jobPost) {
        return axios.post(BASE_REST_API_URL + "/admin/add-jobPost", jobPost)
    }

    getJobPostById(jobPostId) {
        return axios.get(BASE_REST_API_URL + '/admin/get-one/' + jobPostId);
    }

    getJobPostByKeyWordAndStatus(keyword, status) {
        return axios.get(BASE_REST_API_URL + '/search?' + 'keyword=' + keyword + '&status=' + status);
    }

    updateJobPost(jobPost) {
        return axios.put(BASE_REST_API_URL + '/admin/update-info-jobPost', jobPost);
    }

    deleteJobPost(jobPostId) {
        return axios.delete(BASE_REST_API_URL + '/jobPost/' + jobPostId);
    }

}

export const JobPostServiceIml = new JobPostService();

export const updateUserInfo = (userData, history) => async (dispatch) => {
    axios({
        method: "PUT",
        url: API_BASE_URL + "/user/editPassword",
        data: userData,
        headers: {
            "Content-Type" : "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    dispatch({
        type: USER_UPDATED_SUCCESS
    })

    history.push("/account");
};

export const updateUserProfile = (userProfileData, history) => async (dispatch) => {
    axios({
        method: "PUT",
        url: API_BASE_URL + "/user/editProfile",
        data: userProfileData,
        headers: {
            "Content-Type" : "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    dispatch({
        type: USER_UPDATED_SUCCESS
    })

    history.push("/account");
};

export const addReviewToPerfume = (data) => async (dispatch) => {
    try {
        await axios.post(API_BASE_URL + "/user/review", data);

        dispatch({
            type: USER_ADDED_REVIEW_SUCCESS
        })

        window.location.reload();
    } catch (error) {
        dispatch({
            type: USER_ADDED_REVIEW_FAILURE,
            payload: error.response.data
        })
    }
};
