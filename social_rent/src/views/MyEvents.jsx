import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
   StyleSheet,
   View,
   ImageBackground,
   TouchableOpacity,
   Dimensions,
   ScrollView
} from 'react-native'
import {
   Text,
   Block,
   theme,
   Button,
   Input,
   Checkbox
} from 'galio-framework'
import Constants from 'expo-constants'
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';

import MyEventsCard from '../components/MyEventsCard'

const { width, height } = Dimensions.get("screen");


export default function MyEvents({ navigation }) {
   const [ModalVisibility, setModalVisibility] = useState(false);
   const [name, setname] = useState('');
   const [desc, setdesc] = useState('');
   const [date, setdate] = useState(null);
   const [numOfRent, setnumOfRent] = useState(0);


   let dataDropdown = [{
      value: 1,
   }, {
      value: 2,
   }, {
      value: 3,
   }, {
      value: 4
   }]
   return (
      <>
         <View style={styles.statusBar} />
         <ImageBackground
            source={require('../../assets/bg.png')}
            style={styles.bgContainer}
            imageStyle={styles.background}
         >
            <ScrollView showsVerticalScrollIndicator={false}>
               <Block middle>
                  <Text
                     style={{ fontStyle: 'normal', marginTop: 20, marginBottom: 20, fontSize: 20, color: 'white', fontWeight: 'bold' }}
                  >My Events
               </Text>
               </Block>
               <View style={styles.container}>
                  <Button
                     onlyIcon
                     icon="plus"
                     iconFamily="antdesign"
                     iconSize={30}
                     color="#2E71DC"
                     iconColor="#fff"
                     style={{ width: 40, height: 40, marginVertical: 10 }}
                     onPress={() => setModalVisibility(true)}
                  />
                  {/* Disini mapMyEventsCard jangan lupa pprops nya */}
                  <MyEventsCard navigation={navigation} />
                  <MyEventsCard navigation={navigation} />
                  <MyEventsCard navigation={navigation} />

               </View>
            </ScrollView>
         </ImageBackground>

         {/* DI bawah ini MODAL */}
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
                     onChangeText={(value) => setname(value)} />
                  <Input
                     style={styles.textInput}
                     placeholder='event description'
                     onChangeText={(value) => setdesc(value)}
                  />
                  <DatePicker
                     date={date}
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
                     onDateChange={(date) => setdate(date)}
                  />
                  <Dropdown
                     label='Number of people'
                     data={dataDropdown}
                     containerStyle={{ width: 200 }}
                     onChangeText={(value) => setnumOfRent(value)}
                  />
                  <TouchableOpacity
                     style={{ marginTop: 50 }}
                     onPress={() => { }}>
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
      borderRadius: 15,
      marginHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 20
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
   }
})