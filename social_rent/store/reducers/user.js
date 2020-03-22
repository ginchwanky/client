import { SUCCESS_REGISTER, FAILED_LOGIN, FAILED_REGISTER, EMPTY_INPUT } from "../actionTypes"

const initialState = {
    isLoading: true,
    isLogin: false,
    access_token: null,
    name: null,
    email: null,
    age: null,
    gender: null,
    bio: null,
    profilePicture: null
}

export default function register(state = initialState, action) {
    switch (action.type) {
        case SUCCESS_REGISTER:
            return {
                ...state,
                isLoading: false,
                isLogin: true,
                name: action.payload.name,
                email: action.payload.email,
                age: action.payload.age,
                gender: action.payload.gender,
                bio: action.payload.bio,
                profilePicture: action.payload.profilePicture
            }
        case FAILED_REGISTER:
            return {
                ...state,
                isLoading: false,
                isLogin: false,
                access_token: null,
                name: null,
                email: null,
                age: null,
                gender: null,
                bio: null,
                profilePicture: null
            }
        case EMPTY_INPUT:
            return {
                ...state,
                isLogin: false,
                isLoading:false
            }            
        default:
            return state
    }
}