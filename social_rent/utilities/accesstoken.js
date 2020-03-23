import { AsyncStorage } from 'react-native'

export const setAccessToken = async (access_token) => {
    console.log('enter SetItem')
    try {
        await AsyncStorage.setItem('access_token', access_token)
        console.log('sukses enter SetItem')
    } catch (error) {
        console.log(error)
    }
}