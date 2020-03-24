import React, { useState, useEffect } from 'react';
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
import axiosInstance from '../instances/axiosInstance'

import ApplicantCard from '../components/ApplicantCard'

const { width, height } = Dimensions.get('screen')

export default function MyEventDetail({ route, navigation }) {
   const { id } = route.params

   const [Event, setEvent] = useState({});



   useEffect(() => {
      // FETCH APPLICANT SAMA EVENT DETAIL
      axiosInstance.get(`/events/${id}`)
         .then(({ data }) => {
            setEvent(data)
         })
         .catch(err => {
            console.log(err.response, `INI ERROR EVENT GET ONE`);

         })
   }, [])

   if (!Event.creator) {
      // NANTI LOADING DISINI
      return (
         <>
            <View></View>
         </>
      )
   }

   let ApplicantMap = (
      <Block middle>
         <Text muted style={{ marginHorizontal: 10 }}>no one applied yet</Text>
      </Block>
   )
   if (Event.event.Users.length > 0) {
      ApplicantMap = (Event.event.Users.map((data) => <ApplicantCard
         data={data}
         key={data.id}
         navigation={navigation} />))
   }

   return (
      <>
         <View style={styles.statusBar} />
         <View style={{ backgroundColor: 'white' }}>
            <ImageBackground
               source={{ uri: 'https://i0.wp.com/mojok.co/terminal/wp-content/uploads/2019/08/sweet-ice-cream-photography-ASti7dxf8CM-unsplash.jpg?resize=800%2C540&ssl=1' }}
               style={styles.profileContainer}
               imageStyle={styles.profileBackground}
            >
               <ScrollView>
                  <Block style={styles.eventConatainer}>
                     <Block middle>
                        <Text h3 bold style={{ marginTop: 20 }}>{Event.event.name}</Text>
                        <Text
                           muted
                           center
                           style={{ marginHorizontal: 20, marginVertical: 10 }}
                        >{Event.event.description}</Text>
                        <Text p muted>Status: {Event.event.statusEvent}</Text>
                        <View style={styles.divider} />
                        <Text bold size={16} color="#525F7F">
                           list of applicants
                    </Text>
                        <Text muted size={16}>People to hire: {Event.event.numOfRent}</Text>

                        {/* <Text muted italic>Tap the applicant to hire or decline</Text> */}
                     </Block>
                     <Block
                        left
                        style={{ marginHorizontal: 15, marginBottom: 50, marginTop: 20 }}
                     >
                        {/* DISINI MAP APPLICANT NYA */}
                        {ApplicantMap}
                     </Block>
                  </Block>
               </ScrollView>
            </ImageBackground>
         </View>
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