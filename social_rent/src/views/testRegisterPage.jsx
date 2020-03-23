import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
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
            bio: ''
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

        this.loginHit = () => {
            props.navigation.navigate('Transition Register', {
                newName: this.state.name, 
                newEmail: this.state.email,
                newPassword: this.state.password,
                newAge: this.state.age,
                newGender: this.state.gender,
                newBio: this.state.bio
            })
            this.onCloseState
        }
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
                <ScrollView>
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
                        <View style={{ height: height, justifyContent: 'center' }}>
                            <Animated.View
                                style={{
                                    // zIndex: -1,
                                    // opacity: 0,
                                    // zIndex: this.textInputZindex,
                                    // opacity: this.textInputOpacity,
                                    transform: [{ translateY: this.textInputY }],
                                    height: height,
                                    ...StyleSheet.absoluteFill,
                                    top: null,
                                    justifyContent: 'center'
                                }}>
                                <Block middle style={{ marginTop: 50 }}>
                                    <Input
                                        placeholder="Name"
                                        style={styles.textInput}
                                        value={this.state.name}
                                        onChangeText={(name) => { this.setState({ name }) }}
                                    />
                                    <Input
                                        placeholder="Email"
                                        style={styles.textInput}
                                        value={this.state.email}
                                        onChangeText={(email) => { this.setState({ email }) }}
                                    />
                                    <Input
                                        placeholder="Password"
                                        password
                                        viewPass
                                        style={styles.textInput}
                                        value={this.state.password}
                                        onChangeText={(password) => { this.setState({ password }) }}
                                    />
                                    <Input
                                        placeholder="Age"
                                        type="numeric"
                                        style={styles.textInput}
                                        value={this.state.age}
                                        onChangeText={(age) => { this.setState({ age }) }}
                                    />
                                    <Input
                                        placeholder="Gender"
                                        style={styles.textInput}
                                        value={this.state.gender}
                                        onChangeText={(gender) => { this.setState({ gender }) }}
                                    />
                                    {/* <Dropdown
                                    // label='Number of people'
                                    style={styles.textInput}
                                    placeholder="Gender"
                                    data={[{ value: "Male" }, { value: "Female" }]}
                                    containerStyle={{ width: 200 }}
                                    onChangeText={(gender) => { this.setState({ gender }) }}
                                /> */}
                                    <Input
                                        placeholder="Bio"
                                        style={styles.textInput}
                                        value={this.state.bio}
                                        onChangeText={(bio) => { this.setState({ bio }) }}
                                    />
                                </Block>
                                <TouchableOpacity onPress={this.loginHit} style={{ paddingTop: 50 }}>
                                    <Animated.View style={styles.button} >
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>REGISTER</Text>
                                    </Animated.View>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>
                </ScrollView>
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
        marginVertical: 5,

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
        borderWidth: 3,
        borderColor: 'rgba(0,0,0,0.1)'
    }
});