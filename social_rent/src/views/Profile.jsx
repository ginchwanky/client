import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import {
  Text,
  Block,
  theme,
  Input
} from 'galio-framework'
import Constants from 'expo-constants'
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux'
import axiosInstance from '../instances/axiosInstance'
import { register, emptyInput, logout } from '../../store/actionCreators/userAction'

import EventHistoryCard from '../components/EventHistoryCard'

const { width, height } = Dimensions.get("screen");

export default function Profile({ navigation }) {
  const dispatch = useDispatch()

  const [EventsApplied, setEventsApplied] = useState([]);
  const [EventsCreated, setEventsCreated] = useState([]);

  const name = (useSelector(state => state.user.name))
  const age = (useSelector(state => state.user.age))
  const bio = (useSelector(state => state.user.bio))
  const profilePicture = (useSelector(state => state.user.profilePicture))
  const access_token = (useSelector(state => state.user.access_token))
  const id = (useSelector(state => state.user.id))

  let profilePic = <Image
    source={{ uri: 'https://i.pinimg.com/originals/ae/ee/36/aeee36fb34dfae1c43e33c6c3affc1dd.jpg' }}
    style={styles.avatar}
  />

  if (profilePicture) {
    profilePic = <Image
      source={{ uri: `${profilePicture}` }}
      style={styles.avatar}
    />
  }

  const Logout = () => {
    AsyncStorage.removeItem('access_token')
      .then(_ => {
        dispatch(logout)
        navigation.navigate('Landing Page')
      })
      .catch(err => {
        console.log(err, `error logout`);

      })
  }

  const fetchAppliedHistory = () => {
    axiosInstance({
      method: 'get',
      url: `/userEvent/history/${id}`,
    })
      .then(({ data }) => {
        setEventsApplied(data)
      })
      .catch(err => {
        console.log(err.response, `error get userEvent applied history`);
      })
  }

  const fetchEventHistory = () => {
    axiosInstance.get(`/events/history/${id}`)
      .then(({ data }) => {
        setEventsCreated(data)

      })
      .catch(err => {
        console.log(err.response, `error event hhistory`);

      })
  }

  useEffect(() => {
    if (!access_token) {
      navigation.navigate('Landing Page')
    }
    fetchAppliedHistory()
    fetchEventHistory()
  }, [])

  let EventsHistoryMap = <Text muted>you never create an event</Text>
  if (EventsCreated.length > 0) {
    EventsHistoryMap = (EventsCreated.map((data) => <EventHistoryCard data={data} key={data.i} />))
  }

  return (
    <>
      <View style={styles.statusBar} />
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            // source={require('../../assets/bg.png')}
            source={{ uri: 'https://c0.wallpaperflare.com/preview/424/107/611/black-camera.jpg' }}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width }}
            >

              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  {profilePic}
                </Block>

                <Block style={styles.info}>
                  <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 20, paddingBottom: 24 }}
                  >
                    <Button
                      title="Show Barcode"
                      color="#2E71DC"
                      onPress={() => navigation.navigate('Generate Barcode')}
                    />
                  </Block>
                  <Block row space="between">
                    <Block middle>
                      <Text
                        bold
                        size={18}
                        color="#525F7F"
                        style={{ marginBottom: 4 }}
                      >
                        0
                      </Text>
                      <Text size={12} color='grey'>Hired</Text>
                    </Block>
                    <Block middle>
                      <Text
                        bold
                        size={18}
                        color="#525F7F"
                        style={{ marginBottom: 4 }}
                      >
                        {EventsCreated.length}
                      </Text>
                      <Text size={12} color='grey'>Events created</Text>
                    </Block>
                    <Block middle>
                      <Text
                        bold
                        color="#525F7F"
                        size={18}
                        style={{ marginBottom: 4 }}
                      >
                        {EventsApplied.length}
                      </Text>
                      <Text size={12} color='grey'>Applied</Text>
                    </Block>
                  </Block>
                </Block>


                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      {name}, {age}
                    </Text>
                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                      Jakarta, Indonesia
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                    <Text
                      size={16}
                      color="#525F7F"
                      style={{ textAlign: "center" }}
                    >
                      {bio}
                    </Text>
                  </Block>
                  <Block
                    row
                    style={{ paddingVertical: 14, alignItems: "baseline" }}
                  >
                    <Text bold size={16} color="#525F7F">
                      Recent events
                    </Text>
                  </Block>
                  <Block
                    row
                    style={{ paddingBottom: 20, justifyContent: "flex-end" }}
                  >
                    <Button
                      title="my events"
                      color="#2E71DC"
                      onPress={() => {
                        navigation.navigate('My Events')
                        fetchEventHistory()
                        fetchAppliedHistory()
                      }}
                    />
                  </Block>
                  {/* disini loop recents events */}
                  {EventsHistoryMap}

                  <Block middle style={{ marginTop: 30, marginBottom: 60 }}>
                    <Block style={styles.divider} />
                    <TouchableOpacity
                      onPress={() => {
                        Logout()
                      }}
                    >
                      <View style={styles.button}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'red' }}>
                          LOGOUT
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Block>
                </Block>
              </Block>

            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    </>
  )
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: '#2E71DC'
  },
  profile: {
    flex: 1,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 120,
    borderRadius: 20,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  button: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5
  },
  modal: {
    height: height * (3 / 5),
    width: width * (6 / 7),
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    width: 250,
    height: 40,
    borderRadius: 10,
    borderWidth: 0.6,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderColor: 'rgba(0,0,0,0.8)'
  }
})