import {
    SUCCESS_REGISTER,
    FAILED_REGISTER,
    EMPTY_INPUT,
    LOGOUT
} from '../actionTypes'
import axios from 'axios'
import { setAccessToken } from '../../utilities/accesstoken'

export const emptyInput = () => {
    return ({
        type: EMPTY_INPUT,
        payload: null
    })
}

export const successRegister = (payload) => {
    return ({
        type: SUCCESS_REGISTER,
        payload: payload
    })
}

export const failedRegister = () => {
    return ({
        type: FAILED_REGISTER,
        payload: null
    })
}

export const logout = () => {
    return ({
        type: LOGOUT,
        payload: null
    })
}

export const register = (payload) => async dispatch => {
    try {
        if (!payload.name || !payload.email || !payload.password || !payload.age || !payload.gender || !payload.bio || !payload.profilePicture) {
            dispatch(emptyInput)
        } else {
            const { data } = await axios({
                url: `http://localhost:3000/users/register`,
                method: 'POST',
                data: payload
            })
            setAccessToken(JSON.stringify(data))
            dispatch(successRegister(data))
        }
    } catch (error) {
        console.log(error)
    }
}
