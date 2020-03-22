import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../store/actionCreators/userRegister'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import {
    Block,
    Input,
    theme
} from 'galio-framework'

import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import login from './Login';
const { width, height } = Dimensions.get('window');

const {
    Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    interpolate,
    Extrapolate,
    concat
} = Animated;

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position
    ]);
}
class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            age: null,
            gender: '',
            bio: '',
            profilePicture: '',
            isLogin: null
        }
        // this.state.isLogin = useSelector(state => state.user.isLogin)
        this.registerHit = (name, email, password, age, gender, bio, profilePicture) => {
            // untuk nge hit ke server saat register
            // const dispatch = useDispatch()
            let payload = {
                name,
                email,
                password,
                age,
                gender,
                bio,
                profilePicture
            }
            // dispatch(register(payload))
            this.onCloseState
            props.navigation.navigate('Home', payload)
        }

        this.buttonOpacity = new Value(1);

        this.onStateChange = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
                        )
                    ])
            }
        ]);

        this.onCloseState = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
                        )
                    ])
            }
        ]);

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-(2 / 3) * height, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        });

    }


    render() {
        return (
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'flex-end'
                }}
                behavior='padding'>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                        justifyContent: 'flex-end'
                    }}>
                    <Animated.View
                        style={{
                            ...StyleSheet.absoluteFill,
                            transform: [{ translateY: this.bgY }]
                        }}>
                        <Image
                            source={require('../../assets/login-bg.jpg')}
                            style={{ flex: 1, height: null, width: null }}
                        />
                    </Animated.View>
                    <View style={{ height: (1 / 3) * height, justifyContent: 'center' }}>
                        <TouchableOpacity>
                            <TapGestureHandler>
                                <Animated.View
                                    style={{
                                        ...styles.button,
                                        opacity: this.buttonOpacity,
                                        transform: [{ translateY: this.buttonY }]
                                    }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                        SIGN IN
                                    </Text>
                                </Animated.View>
                            </TapGestureHandler>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                                <Animated.View
                                    style={{
                                        ...styles.button,
                                        backgroundColor: '#2E71DC',
                                        opacity: this.buttonOpacity,
                                        transform: [{ translateY: this.buttonY }]
                                    }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                        REGISTER
                                    </Text>
                                </Animated.View>
                            </TapGestureHandler>
                        </TouchableOpacity>
                        <Animated.View
                            style={{
                                // zIndex: -1,
                                // opacity: 0,
                                zIndex: this.textInputZindex,
                                opacity: this.textInputOpacity,
                                transform: [{ translateY: this.textInputY }],
                                height: (2 / 3) * height,
                                ...StyleSheet.absoluteFill,
                                top: null,
                                justifyContent: 'center'
                            }}>
                            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                                <Animated.View style={styles.closedButton}>
                                    <Animated.Text style={{ fontSize: 15, fontWeight: 'bold', transform: [{ rotate: concat(this.rotateCross, 'deg') }] }}>
                                        X
                                </Animated.Text>
                                </Animated.View>
                            </TapGestureHandler>
                            <Block middle style={{ marginTop: 50 }}>
                                <Input
                                    placeholder="Name"
                                    style={styles.textInput}
                                    value={this.state.name}
                                    onChangeText={(name) => { this.setState({ name }) }} />
                                <Input
                                    placeholder="Email"
                                    style={styles.textInput}
                                    value={this.state.email}
                                    onChangeText={(email) => { this.setState({ email }) }} />
                                <Input
                                    placeholder="Password"
                                    password
                                    viewPass
                                    style={styles.textInput}
                                    value={this.state.password}
                                    onChangeText={(password) => { this.setState({ password }) }} />
                                <Input
                                    placeholder="Age"
                                    style={styles.textInput}
                                    value={this.state.age}
                                    onChangeText={(age) => { this.setState({ age }) }} />
                                <Input
                                    placeholder="Gender"
                                    style={styles.textInput}
                                    value={this.state.gender}
                                    onChangeText={(gender) => { this.setState({ gender }) }} />
                                <Input
                                    placeholder="Bio"
                                    style={styles.textInput}
                                    value={this.state.bio}
                                    onChangeText={(bio) => { this.setState({ bio }) }} />
                                <Input
                                    placeholder="Profile Picture"
                                    style={styles.textInput}
                                    value={this.state.profilePicture}
                                    onChangeText={(profilePicture) => { this.setState({ profilePicture }) }} />
                            </Block>
                            <TouchableOpacity onPress={this.registerHit(this.state.name, this.state.email, this.state.password, this.state.age, this.state.gender, this.state.bio, this.state.profilePicture)}>
                                <Animated.View style={styles.button} >
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>REGISTER</Text>
                                </Animated.View>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'white',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    textInput: {
        width: width / 1.2,
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        marginVertical: 0,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    closedButton: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -20,
        left: width / 2 - 20,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.1)'
    }
});