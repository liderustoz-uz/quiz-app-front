import {dispatch} from "../store/store";
import {SIGNIN_SUCCESS} from "../types/types";

export const signInSuccess = (token) => {
    dispatch({type: SIGNIN_SUCCESS, action: token})
}