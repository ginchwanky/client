import { AsyncStorage } from 'react-native'

export const setAccessToken = async (access_token) => {
    try {
        await AsyncStorage.setItem('access_token', access_token)
    } catch (error) {
        console.log(error)
    }
}