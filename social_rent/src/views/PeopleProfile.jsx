import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Button,
  Dimensions,
  ScrollView
} from 'react-native'
import {
  Text,
  Block,
  theme
} from 'galio-framework'
import Constants from 'expo-constants'
import axiosInstance from '../instances/axiosInstance'
import { useSelector } from 'react-redux'

import EventHistoryCard from '../components/EventHistoryCard'

const { width, height } = Dimensions.get("screen");

export default function PeopleProfile({ route, navigation }) {
  const [EventsApplied, setEventsApplied] = useState([]);
  const [EventsCreated, setEventsCreated] = useState([]);
  const [Hired, setHired] = useState(0);
  const name = useSelector(state => state.user.name)
  const profilePicture = useSelector(state => state.user.profilePicture)
  const id = useSelector(state => state.user.id)

  const dataProfile = {
    name,
    profilePicture,
    id
  }

  const { data } = route.params

  useEffect(() => {
    axiosInstance({
      method: 'get',
      url: `/userEvent/history/${data.id}`,
    })
      .then(({ data }) => {
        setEventsApplied(data)
        console.log(data, `INI EVENT APPLIEDDDDDDDD`);

      })
      .catch(err => {
        console.log(err.response, `INI ERRORRRRR`);
      })

    axiosInstance.get(`/events/history/${data.id}`)
      .then(({ data }) => {
        setEventsCreated(data)
      })
      .catch(err => {
        console.log(err.response, `INI ERROR HISTORY EVENT CREATED GET DI USEEFFECT`);

      })
  }, [])

  let EventsHistoryMap = <Text muted>this user never applied in an event</Text>
  if (EventsCreated.length > 0) {
    EventsHistoryMap = (EventsCreated.map((data, i) => <EventHistoryCard data={data} key={i} />))
  }

  let profilePic = <Image
    source={{ uri: 'https://data.whicdn.com/images/324482590/original.jpg' }}
    style={styles.avatar}
  />

  if (data.profilePicture) {
    profilePic = <Image
      source={{ uri: `${data.profilePicture}` }}
      style={styles.avatar}
    />
  }

  return (
    <>
      <View style={styles.statusBar} />
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
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
                      title="Send Message"
                      color="#2E71DC"
                      onPress={() => { navigation.navigate('Chats', { dataPeople: data, dataProfile }) }}
                    />
                  </Block>
                  <Block row space="between">
                    {/* <Block middle>
                      <Text
                        bold
                        size={18}
                        color="#525F7F"
                        style={{ marginBottom: 4 }}
                      >
                        {Hired}
                      </Text>
                      <Text size={12} color='grey'>Hired</Text>
                    </Block> */}

                    {/* NYALAIN LAGI SETELAH NAMBAH HIRED PROPERTY APPLICANT DI USER */}


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
                      {data.name}, {data.age}
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
                      {data.bio}
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

                  {EventsHistoryMap}

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
    zIndex: 2,
    paddingBottom: 50
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
  }
})