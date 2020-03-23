import React, { useState, useEffect } from 'react';
import {
   StyleSheet,
   View,
   ImageBackground,
   Dimensions,
   ScrollView,
   Image,
   TouchableOpacity
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


const { width, height } = Dimensions.get('screen')

export default function MyEventDetail({ route, navigation }) {
   const { id } = route.params

   const [Data, setData] = useState([]);
   const [ModalVisibility, setModalVisibility] = useState(false);
   const [payment, setpayment] = useState(null);
   const [notes, setnotes] = useState('');

   useEffect(() => {
      axiosInstance.get(`/events/${id}`)
         .then(({ data }) => {
            setData(data)
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

   return (
      <>
         <View style={styles.statusBar} />
         <ImageBackground
            source={{ uri: 'https://thoughtcatalog.files.wordpress.com/2016/08/bffs-2.jpg?w=1140&h=760' }}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
         >
            <ScrollView>
               <Block style={styles.eventConatainer}>
                  <Block middle flex>
                     <Text h3 bold style={{ marginTop: 20 }}>{Data.event.name}</Text>
                     <Text muted center style={{ marginHorizontal: 20, marginVertical: 10 }}>{Data.event.description}</Text>
                     <Text p muted size={15}>Location: {Data.event.location}</Text>
                     <Text p muted size={15}>Date: {Data.event.date}</Text>
                     <Text p muted bold size={15}>Status: Pending</Text>
                     <View style={styles.divider} />
                     <Text bold size={15} color="#525F7F">
                        wanna go out with me?
                    </Text>
                     <TouchableOpacity
                        onPress={() => navigation.navigate('People Profile', { data: Data.creator })}>
                        <Image
                           source={{
                              uri: 'https://m.media-amazon.com/images/I/71yspNc9hqL._SS500_.jpg',
                              height: 100, width: 100
                           }}
                           style={{ borderRadius: 100, marginTop: 10, marginBottom: 10 }}
                        />
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
                     onPress={() => { }}>
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