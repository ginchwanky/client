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


const { width, height } = Dimensions.get('screen')

export default function MyEventDetail({ route, navigation }) {
   const [ModalVisibility, setModalVisibility] = useState(false);
   const [payment, setpayment] = useState(null);
   const [notes, setnotes] = useState('');


   return (
      <>
         <View style={styles.statusBar} />
         <ImageBackground
            source={{ uri: 'https://thoughtcatalog.files.wordpress.com/2016/08/bffs-2.jpg?w=1140&h=760' }}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
         >
            <Block style={styles.eventConatainer}>
               <ScrollView>
                  <Block middle flex>
                     <Text h3 bold style={{ marginTop: 20 }}>Kondangan</Text>
                     <Text muted center style={{ marginHorizontal: 20, marginVertical: 10 }}>Hai i don't have that many friends to ask in order to accompanying me to one of my friends wedding. so can you pretend to be my gf atm?</Text>
                     <Text p muted size={15}>Date: 2020-03-27</Text>
                     <Text p muted bold size={15}>Status: Pending</Text>
                     <View style={styles.divider} />
                     <Text bold size={15} color="#525F7F">
                        wanna go out with me?
                    </Text>
                     <TouchableOpacity onPress={() => navigation.navigate('People Profile')}>
                        <Image
                           source={{
                              uri: 'https://m.media-amazon.com/images/I/71yspNc9hqL._SS500_.jpg',
                              height: 100, width: 100
                           }}
                           style={{ borderRadius: 100, marginTop: 10, marginBottom: 10 }}
                        />
                     </TouchableOpacity>
                     <Text italic muted>created by: Niki Prakoso</Text>
                     <Button
                        round
                        uppercase
                        color="#50C7C7"
                        style={{ width: 200, marginTop: 20 }}
                        onPress={() => setModalVisibility(true)}
                     >Sign me in!</Button>
                  </Block>
               </ScrollView>
            </Block>
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