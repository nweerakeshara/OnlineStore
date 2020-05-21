import {USER_LOADING,USER_LOADED,REGISTER_FAIL,REGISTER_SUCCESS,LOGOUT_SUCCESS,LOGIN_FAIL,LOGIN_SUCCESS,AUTH_ERROR} from "./types";
import {returnErrors} from "./errorActions";
import axios from 'axios';

export const loadUser = () => (dispatch, getState) => {
    dispatch ({type: USER_LOADING});
    const token = getState().cus.token;
    const config = {
        headers : {
            "Content-type": "application/json"
        }
    }

    if(token){
        config.headers['cus_auth'] = token;
    }
    axios.get('/api/cus/get/cus', config).then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
    })).catch(error => {
        dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({
            type:AUTH_ERROR
        })
    });
}