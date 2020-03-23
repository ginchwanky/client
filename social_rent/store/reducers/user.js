import { SUCCESS_REGISTER, FAILED_LOGIN, FAILED_REGISTER, EMPTY_INPUT, SUCCESS_LOGIN } from "../actionTypes"

const initialState = {
    isLoading: true,
    isLogin: false,
    access_token: null,
    name: null,
    email: null,
    age: null,
    gender: null,
    bio: null,
    profilePicture: null // nanti tambahkan state buat nyimpen token

}

export default function register(state = initialState, action) {
    switch (action.type) {
        case SUCCESS_REGISTER:
            return {
                ...state,
                isLoading: false,
                isLogin: true,
                access_token: action.payload.access_token,
                name: action.payload.name
            }
        case SUCCESS_LOGIN:
            return {
                ...state,
                isLoading: false,
                isLogin: true,
                access_token: action.payload.access_token,
                name: action.payload.name
            }
        case EMPTY_INPUT:
            return {
                ...state,
                isLogin: false,
                isLoading: false
            }
        default:
            return state
    }
}