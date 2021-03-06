import { SUCCESS_REGISTER, SUCCESS_LOGIN, LOGOUT, EMPTY_INPUT } from "../actionTypes"

const initialState = {
    isLoading: true,
    isLogin: false,
    access_token: null,
    name: null,
    email: null,
    age: null,
    gender: null,
    bio: null,
    profilePicture: null,
    id: null
}

export default function register(state = initialState, action) {
    switch (action.type) {
        case SUCCESS_REGISTER:
            return {
                ...state,
                isLoading: false,
                isLogin: true,
                access_token: action.payload.access_token,
                name: action.payload.name,
                email: action.payload.email,
                age: action.payload.age,
                gender: action.payload.gender,
                bio: action.payload.bio,
                profilePicture: action.payload.profilePicture,
                id: action.payload.id
            }
        case SUCCESS_LOGIN:
            return {
                ...state,
                isLoading: false,
                isLogin: true,
                access_token: action.payload.access_token,
                name: action.payload.name,
                email: action.payload.email,
                age: action.payload.age,
                gender: action.payload.gender,
                bio: action.payload.bio,
                profilePicture: action.payload.profilePicture,
                id: action.payload.id
            }
        case EMPTY_INPUT:
            return {
                ...state,
                isLogin: false,
                isLoading: false
            }
        case LOGOUT:
            return {
                ...state,
                isLoading: false,
                isLogin: false,
                access_token: null
            }
        default:
            return state
    }
}