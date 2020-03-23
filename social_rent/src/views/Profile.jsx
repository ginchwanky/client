import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import {
  Text,
  Block,
  theme,
  Input
} from 'galio-framework'
import Constants from 'expo-constants'
import Modal from 'react-native-modal';

import EventHistoryCard from '../components/EventHistoryCard'

const { width, height } = Dimensions.get("screen");

export default function Profile({ navigation }) {


  let dataDropdown = [{
    value: 'male',
  }, {
    value: 'female',
  }]


  return (
    <>
      <View style={styles.statusBar} />
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            // source={require('../../assets/bg.png')}
            source={{uri: 'https://c0.wallpaperflare.com/preview/424/107/611/black-camera.jpg'}}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width}}
            >

              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: 'https://cdnph.upi.com/svc/sv/upi/8631478538164/2016/1/a42cfe55775589649bbb7ea457a45e24/New-Childish-Gambino-album-titled-Awaken-My-Love-found-listed-on-Amazon.jpg' }}
                    style={styles.avatar}
                  />
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
                        10
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
                        3
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
                        15
                      </Text>
                      <Text size={12} color='grey'>Applied</Text>
                    </Block>
                  </Block>
                </Block>


                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      Gambino, 24
                    </Text>
                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                      New York, USA
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
                      Hi nice to meet you, let's be friends and going places!
                    </Text>
                  </Block>
                  <Block
                    row
                    style={{ paddingVertical: 14, alignItems: "baseline" }}
                  >
                    <Text bold size={16} color="#525F7F">
                      Recent Events
                    </Text>
                  </Block>
                  <Block
                    row
                    style={{ paddingBottom: 20, justifyContent: "flex-end" }}
                  >
                    <Button
                      title="my events"
                      color="#2E71DC"
                      onPress={() => navigation.navigate('My Events')}
                    />
                  </Block>
                  {/* disini loop recents events */}
                  {/* <EventHistoryCard />
                  <EventHistoryCard />
                  <EventHistoryCard /> */}

                  <Block middle style={{ marginTop: 30, marginBottom: 60 }}>
                    <Block style={styles.divider} />
                    <TouchableOpacity>
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