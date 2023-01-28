import {SIGNIN_SUCCESS} from "../types/types";

const InitialState = {
    array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    user:''
}

const reducer = (state = InitialState, action) => {
    console.log(action)
    switch (action.type) {
        case SIGNIN_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default reducer;