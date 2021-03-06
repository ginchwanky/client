import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../store/actionCreators/userAction'
import { TouchableHighlight } from 'react-native-gesture-handler'

export default function TransitionRegister({ navigation, route }) {
    const access_token = useSelector(state => state.user.access_token)
    const { newName, newEmail, newPassword, newAge, newGender, newBio } = route.params
    const payload = { newName, newEmail, newPassword, newAge, newGender, newBio }
    const dispatch = useDispatch()

    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('access_token');
            if (value !== null) {
                console.log('async storage =>', value);
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        dispatch(register(payload))
    })

    useEffect(() => {
        if (access_token) {
            navigation.navigate('Home')
        } else {
            navigation.navigate('Landing Page')
        }
    }, [access_token])

    return (
        <View>
            <Text></Text>
        </View>
    )
}