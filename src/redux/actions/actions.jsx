import {dispatch} from "../store/store";
import {GET_DATA, HUNDLE_TESTS, SIGNIN_SUCCESS} from "../types/types";

export const signInSuccess = (token) => {
    dispatch({type: SIGNIN_SUCCESS, payload: token})
}

export const roleUserHandleTest = (data) => {
    dispatch({type: HUNDLE_TESTS, payload: data})
}

export const getDataRedux = (data) => {
    dispatch({type: GET_DATA, payload: data})
}