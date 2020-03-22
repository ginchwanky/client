import React from 'react';
import {
   StyleSheet,
   View,
   ImageBackground,
   Dimensions,
   ScrollView
} from 'react-native'
import {
   Block,
   Text,
   theme
} from 'galio-framework'
import Constants from 'expo-constants'

const { width, height } = Dimensions.get('screen')

export default function MyEventDetail({ route, navigation }) {

   return (
      <>
         <View style={styles.statusBar} />
         <ImageBackground
            source={{ uri: 'https://i0.wp.com/mojok.co/terminal/wp-content/uploads/2019/08/sweet-ice-cream-photography-ASti7dxf8CM-unsplash.jpg?resize=800%2C540&ssl=1' }}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
         >
            <Block style={styles.eventConatainer}>
               <ScrollView>
                  <Block middle flex>
                     <Text h3 bold style={{marginTop: 20}}>Kondangan</Text>
                     <Text muted center style={{marginHorizontal: 20, marginVertical: 10}}>Hai i don't have that many friends to ask in order to accompanying me to one of my friends wedding. so can you pretend to be my gf atm?</Text>
                     <Text p muted>Status: Pending</Text>
                  <View style={styles.divider}/>
                  <Text bold size={16} color="#525F7F">
                      list of applicants
                    </Text>
                    {/* DISINI MAP APPLICANT NYA */}
                    
                  </Block>
               </ScrollView>
            </Block>
         </ImageBackground>
      </>
   )
}

const styles = StyleSheet.create({
   statusBar: {
      height: Constants.statusBarHeight,
      backgroundColor: '#2E71DC'
   },
   profileContainer: {
      width: width,
      height: height,
      padding: 0,
      zIndex: 1
   },
   profileBackground: {
      width: width,
      height: height / 2.6
   },
   eventConatainer: {
      width: width,
      height: height,
      backgroundColor: 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: 250
   },
   divider: {
      width: "90%",
      borderWidth: 1,
      borderColor: "#E9ECEF",
      marginVertical: 20
    }
})