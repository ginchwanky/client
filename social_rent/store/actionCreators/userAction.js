import {
    SUCCESS_REGISTER,
    FAILED_REGISTER,
    EMPTY_INPUT,
    LOGOUT,
    SUCCESS_LOGIN,
    FAILED_LOGIN
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

export const successLogin = (payload) => {
    return ({
        type: SUCCESS_LOGIN,
        payload: payload
    })
}

export const logout = () => {
    return ({
        type: LOGOUT,
        payload: null
    })
}

// export const register = (payload) => async dispatch => {
//     try {
//         console.log('>>>', payload)
//         const { data } = await axios({
//             url: `http://localhost:3000/users/register`,
//             method: 'POST',
//             data: payload
//         })
//         console.log('+++', data)
//         setAccessToken(JSON.stringify(data))
//         dispatch(successRegister(data))

//     } catch (error) {
//         console.log(error)
//     }
// }

export const register = (payload) => {
    console.log('>>>>>>>>>>', payload)
    let newPayload = {
        name: payload.newName,
        email: payload.newEmail,
        password: payload.newPassword,
        age: payload.newAge,
        gender: payload.newGender,
        bio: payload.newBio
    }
    return dispatch => {
        axios
            .post(`http://localhost:3000/users/register`, newPayload)
            .then(({data}) => {
                setAccessToken(JSON.stringify(data))
                dispatch(successRegister(data))
            })
            .catch(console.log)
    }
}

export const login = (payload) => async dispatch => {
    try {
        if (!payload.email || !payload.password) {
            dispatch(emptyInput)
        } else {
            const { data } = await axios({
                url: `http://localhost:3000/users/login`,
                method: 'POST',
                data: payload
            })
            // setAccessToken(JSON.stringify(data))
            dispatch(successLogin(data))
        }
    } catch (error) {
        console.log(error)
    }
}
