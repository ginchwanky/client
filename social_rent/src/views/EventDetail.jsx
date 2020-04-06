import React, { useState, useEffect } from 'react';
import {
   StyleSheet,
   View,
   ImageBackground,
   Dimensions,
   ScrollView,
   Image,
   TouchableOpacity,
   AsyncStorage,
   Alert
} from 'react-native'
import {
   Block,
   Text,
   theme,
   Button,
   Input
} from 'galio-framework'
import Constants from 'expo-constants'
import Modal from 'react-native-modal';
import axiosInstance from '../instances/axiosInstance'
import { useSelector } from 'react-redux'

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const { width, height } = Dimensions.get('screen')

export default function MyEventDetail({ route, navigation }) {
   const { id } = route.params
   const currentUserId = useSelector(state => state.user.id)
   const currentUserName = useSelector(state => state.user.name)
   const [Data, setData] = useState([]);
   const [ModalVisibility, setModalVisibility] = useState(false);
   const [payment, setpayment] = useState(null);
   const [notes, setnotes] = useState('');
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
      console.log(finalStatus)
      const pushToken = await Notifications.getExpoPushTokenAsync()
      setPushtoken(pushToken)
      console.log("Notification Token: ", pushToken);
      console.log('====================')
      console.log(pushToken)
      console.log('name', currentUserName)
      console.log('event', Data.event.name)
      console.log('payment', payment)
      console.log('notif:', `${currentUserName} joined the ${Data.event.name}'s event!`)
      console.log('====================')
   }
   console.log('[[[[[]]]]]', pushtoken)
   useEffect(() => {
      getPushNotificationPermissions();
   });

   const submitHandler = () => {
      let payload = {
         EventId: id,
         payment: Number(payment),
         date: Data.event.date,
         pushToken: pushtoken,
         bodyNotif: `${currentUserName} joined the ${Data.event.name}'s event`
      }
      console.log('ini payload', payload)
      AsyncStorage.getItem('access_token')
         .then(data => {
            data = JSON.parse(data)
            console.log('ini token', data.access_token)
            return axiosInstance({
               url: '/userEvent',
               method: 'POST',
               headers: { access_token: data.access_token },
               data: payload
            })
               .then(({ data }) => {
                  setModalVisibility(false)
                  return axiosInstance({
                     method: 'GET',
                     url: `/events/${id}`
                  })
               })
               .then(({ data }) => {
                  console.log(data, '==========')
                  setData(data)
                  Alert.alert(
                     `You applied to this event successfully!`,
                     `be sure to attend this event`,
                     [
                        {
                           text: 'ok'
                        }
                     ]
                  )
               })
               .catch(err => {
                  console.log(err.response.data, `INI DARI APPLIED EVENTTTTTT`);

                  Alert.alert(
                     `Oops`,
                     `${err.response.data.errors[0]}`,
                     [
                        {
                           text: 'ok', onPress: () => {
                              setModalVisibility(false)
                           }
                        }
                     ]
                  )
               })
         })
   }

   useEffect(() => {
      axiosInstance.get(`/events/${id}`)
         .then(({ data }) => {
            setData(data)
            console.log(data, `INI DATAAAAA`);
            if (currentUserId == data.creator.id) {
               navigation.navigate('My Event Detail', { id: data.event.id })
            }
         })
         .catch(err => {
            console.log(err, `ERRRORRRRRRRRRRR`);
         })
   }, []);
   if (!Data.event) {
      // NANTI LOADING DISINI
      return (
         <>
            <View></View>
         </>
      )
   }

   let profilePic = <Image
      source={{
         uri: 'https://i.pinimg.com/originals/ae/ee/36/aeee36fb34dfae1c43e33c6c3affc1dd.jpg',
         height: 100, width: 100
      }}
      style={{ borderRadius: 100, marginTop: 10, marginBottom: 10 }}
   />

   if (Data.creator.profilePicture) {
      profilePic = <Image
         source={{ uri: `${Data.creator.profilePicture}`, height: 100, width: 100 }}
         style={{ borderRadius: 100, marginTop: 10, marginBottom: 10 }}
      />
   }

   return (
      <>
         <View style={styles.statusBar} />
         <ImageBackground
            source={{ uri: 'https://i0.wp.com/mojok.co/terminal/wp-content/uploads/2019/08/sweet-ice-cream-photography-ASti7dxf8CM-unsplash.jpg?resize=800%2C540&ssl=1' }}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
         >
            <ScrollView>
               <Block style={styles.eventConatainer}>
                  <Block middle flex>
                     <Text h3 bold style={{ marginTop: 20 }}>{Data.event.name}</Text>
                     <Text muted center style={{ marginHorizontal: 20, marginVertical: 10 }}>{Data.event.description}</Text>
                     <Text p muted size={15}>Location: {Data.event.location}</Text>
                     <Text p muted size={15}>Date: {Data.event.date.slice(0,10)}</Text>
                     <Text p muted bold size={15}>Status: Pending</Text>
                     <View style={styles.divider} />
                     <Text bold size={15} color="#525F7F">
                        wanna go out with me?
                    </Text>
                     <TouchableOpacity
                        onPress={() => navigation.navigate('People Profile', { data: Data.creator })}>

                        {profilePic}

                     </TouchableOpacity>
                     <Text italic muted>created by: {Data.creator.name}</Text>
                     <Button
                        round
                        uppercase
                        color="#50C7C7"
                        style={{ width: 200, marginTop: 20 }}
                        onPress={() => setModalVisibility(true)}
                     >Sign me in!</Button>
                  </Block>
               </Block>
            </ScrollView>
         </ImageBackground>

         {/* ini modal */}
         <Modal
            isVisible={ModalVisibility}
            onBackdropPress={() => setModalVisibility(false)}
            animationInTiming={700}
            animationOutTiming={700}
            avoidKeyboard={true}
         >
            <Block middle>
               <View style={styles.modal}>
                  <Text h5 bold italic style={{ marginBottom: 20 }}>Apply for this event</Text>
                  <Input
                     style={styles.textInput}
                     placeholder='fee'
                     onChangeText={(value) => setpayment(value)} />
                  <Input
                     style={styles.textInput}
                     placeholder='notes (why you demand these fee)'
                     onChangeText={(value) => setnotes(value)} />

                  <TouchableOpacity
                     style={{ marginTop: 30 }}
                     onPress={() => submitHandler()}>
                     <Block
                        middle
                        style={{ width: 150, backgroundColor: '#2E71DC', height: 50, borderRadius: 15 }}>
                        <Text size={17} style={{ color: 'white' }}>send request</Text>
                     </Block>
                  </TouchableOpacity>
               </View>
            </Block>
         </Modal>
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
      marginTop: 250,
      paddingBottom: 50
   },
   divider: {
      width: "90%",
      borderWidth: 1,
      borderColor: "#E9ECEF",
      marginVertical: 20
   },
   modal: {
      height: height * (2 / 5),
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