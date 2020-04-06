import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Button,
    Alert
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/actionCreators/userAction'

export default function TransitionLogin({ navigation, route }) {
    const access_token = useSelector(state => state.user.access_token)
    const { email, password } = route.params
    const payload = { email, password }
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
        dispatch(login(payload))
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