import React, { useState, useEffect } from 'react';
import {
   StyleSheet,
   View,
   Image,
   ScrollView,
   TouchableOpacity,
   ImageBackground,
   Dimensions,
   Alert
} from 'react-native'

import {
   Block,
   Button,
   theme,
   Input,
   Text,
} from 'galio-framework'
import Constants from 'expo-constants';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';

import axiosInstance from '../instances/axiosInstance'

import EventCard from '../components/EventCard'
import { useSelector } from 'react-redux';
import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
const { width, height } = Dimensions.get("screen");

export default function Home({ navigation, props }) {
   const {
      isLoading, isLogin, name, email, age, gender, bio, profilePicture, access_token
   } = useSelector(state => state)

   const [ModalVisibility, setModalVisibility] = useState(false);
   const [Name, setName] = useState('');
   const [Desc, setDesc] = useState('');
   const [Date, setDate] = useState(null);
   const [Location, setLocation] = useState('');
   const [NumOfRent, setNumOfRent] = useState(0);
   const [Data, setData] = useState([]);
   const [pushtoken, setPushtoken] = useState('')

   const getPushNotificationPermissions = async () => {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
         const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
         finalStatus = status;
      }
      if (finalStatus !== 'granted') {
         return;
      }
      console.log(finalStatus) //sukses
      const pushToken = await Notifications.getExpoPushTokenAsync()
      setPushtoken(pushToken)
      console.log("Notification Token: ", pushToken);
      console.log('====================')
      console.log(pushToken, `INI PUSH TOKENNNNNNNNNNNNNNNNNNNNNNNN`)
      console.log('Name', Name)
      console.log('Desc', Desc)
      console.log('Date', Date)
      console.log('Location', Location)
      console.log('NumOfRent', NumOfRent)
      console.log('NOTIF', `A new event is created: ${Name}!`)
      console.log('====================')
   }
   console.log('[[[[[]]]]]', pushtoken)

   let dataDropdown = [{
      value: 1,
   }, {
      value: 2,
   }, {
      value: 3,
   }, {
      value: 4
   }]

   useEffect(() => {
      getPushNotificationPermissions();

      axiosInstance({
         method: 'get',
         url: '/events'
      })
         .then(({ data }) => {
            setData(data)
         })
         .catch(err => {
            console.log(err);
         })
   }, []);

   let DataMap = <Text style={{ marginBottom: 15, marginTop: 10 }}>No current event available</Text>
   if (Data.length > 0) {
      DataMap = (Data.map(data => <EventCard navigation={navigation} data={data} key={data.id} />))
   }

   const submitHandler = () => {
      let payload = {
         name: Name,
         desc: Desc,
         date: Date,
         numOfRent: NumOfRent,
         location: Location,
         pushToken: pushtoken,
         bodyNotif: `There's new event for you: ${Name}!`
      }
      AsyncStorage.getItem('access_token')
         .then(data => {
            data = JSON.parse(data)
            return axiosInstance({
               url: '/events',
               method: 'POST',
               headers: { access_token: data.access_token },
               data: payload
            })
               .then(({ data }) => {
                  setModalVisibility(false)
                  return axiosInstance({
                     method: 'get',
                     url: '/events'
                  })
               })
               .then(({ data }) => {
                  setData(data)
               })
               .catch(err => {
                  console.log(err);
               })
         })
         .catch(console.log)
   }

   return (
      <>
         <View style={styles.statusBar} />
         <ImageBackground
            source={require('../../assets/bg-profile.jpeg')}
            style={styles.bgContainer}
            imageStyle={styles.background}
         >
            <Button
               onlyIcon
               icon="plus"
               iconFamily="antdesign"
               iconSize={30}
               color="#2E71DC"
               iconColor="#fff"
               style={styles.btn}
               onPress={() => setModalVisibility(true)}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
               <Block middle>
                  <Text
                     style={{ fontStyle: 'normal', marginTop: 20, marginBottom: 20, fontSize: 20, color: 'white', fontWeight: 'bold' }}
                  >Available events
               </Text>
               </Block>
               <View style={styles.container}>
                  {DataMap}
               </View>
            </ScrollView>
         </ImageBackground>

         {/* Dibawah ini Modal */}
         <Modal
            isVisible={ModalVisibility}
            onBackdropPress={() => setModalVisibility(false)}
            animationInTiming={700}
            animationOutTiming={700}
            avoidKeyboard={true}
         >

            <Block middle>
               <View style={styles.modal}>
                  <Text h5 bold italic style={{ marginBottom: 20 }}>Create new event</Text>
                  <Input
                     style={styles.textInput}
                     placeholder='name of event'
                     onChangeText={(value) => setName(value)} />
                  <Input
                     style={styles.textInput}
                     placeholder='event description'
                     onChangeText={(value) => setDesc(value)}
                  />
                  <Input
                     style={styles.textInput}
                     placeholder='event location'
                     value={Location}
                     onChangeText={(value) => setLocation(value)}
                  />
                  <DatePicker
                     date={Date}
                     mode="date"
                     placeholder="select date"
                     format="YYYY-MM-DD"
                     // minDate="2016-05-01"
                     // maxDate="2016-06-01"
                     confirmBtnText="Confirm"
                     cancelBtnText="Cancel"
                     customStyles={{
                        dateIcon: {
                           position: 'absolute',
                           left: 0,
                           top: 4,
                           marginLeft: 0
                        },
                        dateInput: {
                           marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                     }}
                     style={{ ...styles.textInput, borderWidth: 0, marginTop: 10 }}
                     onDateChange={(date) => setDate(date)}
                  />
                  <Dropdown
                     label='Number of people'
                     data={dataDropdown}
                     containerStyle={{ width: 200 }}
                     onChangeText={(value) => setNumOfRent(value)}
                  />
                  <TouchableOpacity
                     style={{ marginTop: 30 }}
                     onPress={() => submitHandler()}>
                     <Block
                        middle
                        style={{ width: 150, backgroundColor: '#2E71DC', height: 50, borderRadius: 15 }}>
                        <Text size={17} style={{ color: 'white' }}>Create event!</Text>
                     </Block>
                  </TouchableOpacity>
               </View>
            </Block>
         </Modal>
      </>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginHorizontal: 15,
      paddingTop: 10,
      marginBottom: 80
   },
   test: {
      fontSize: 20,
      fontWeight: 'bold'
   },
   statusBar: {
      height: Constants.statusBarHeight,
      backgroundColor: '#2E71DC'
   },
   bgContainer: {
      width: width,
      height: height,
      padding: 0,
      zIndex: 1
   },
   background: {
      width: width,
      height: height
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
   },
   btn: {
      width: 50,
      height: 50,
      marginVertical: 10,
      zIndex: 1,
      position: 'absolute',
      bottom: 125,
      right: 30
   }
})