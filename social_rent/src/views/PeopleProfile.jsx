import React from 'react';
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

import EventHistoryCard from '../components/EventHistoryCard'

const { width, height } = Dimensions.get("screen");

export default function Profile({ navigation }) {

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
              style={{ width }}
            >

              <Block flex style={styles.profileCard}>

                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: 'https://m.media-amazon.com/images/I/71yspNc9hqL._SS500_.jpg' }}
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
                        title="Send Message"
                        color="#2E71DC"
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
                      Niki Prakoso, 17
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
                      Hi nice to meet you, let's be friends and going places!
                    </Text>
                  </Block>
                  <Block
                    row
                    style={{ paddingVertical: 14, alignItems: "baseline" }}
                  >
                    <Text bold size={16} color="#525F7F">
                      Events History
                    </Text>
                  </Block>
                 
                  {/* disini loop events history */}
                  <EventHistoryCard />

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
  }
})