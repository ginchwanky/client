import React, { useState, useEffect } from 'react';
import {
   StyleSheet,
   Image,
   View,
   Dimensions,
   TouchableOpacity,
   Alert
} from 'react-native'
import {
   Text,
   Block,
   theme,
   Button
} from 'galio-framework'
import axiosInstance from '../instances/axiosInstance'

const { width, height } = Dimensions.get('screen')

export default function ApplicantCard(props) {

   const [StatusApplicant, setStatusApplicant] = useState('pending');

   

   const acceptApplicant = () => {
      console.log('accept ke hit');

      axiosInstance({
         method: 'put',
         url: `/userEvent/applicants/${props.data.UserEvent.EventId}`,
         data: {
            UserId: props.data.id,
            statusApplicant: true
         }
      })
         .then(({ data }) => {
            // button = <Button
            //    onlyIcon
            //    icon="attach-money"
            //    iconFamily="MaterialIcons"
            //    iconSize={20}
            //    color="#50C7C7"
            //    iconColor="#fff"
            //    style={{ width: 30, height: 30, marginTop: 20, }}
            //    onPress={() => {
            //       props.navigation.navigate('Barcode Scanner',
            //          { EventId: props.data.UserEvent.EventId, UserId: props.data.id }
            //       )
            //    }}
            // />
            props.setChangeStatus('ganti')
            setStatusApplicant('accepted')
         })
         .catch(err => {
            console.log(err.response, `INI ERROR HIREEEEEE`);
            Alert.alert(
               'Already hired enough people', 'press ok to confirm', [
                  {
                     text: 'ok'
                  }
               ]
            )
         })
   }

   useEffect(() => {
      if (props.data.UserEvent.statusApplicant) {
         setStatusApplicant('accepted')
      }
   }, []);

   let button = <Button
      onlyIcon
      icon="check"
      iconFamily="antdesign"
      iconSize={20}
      color="#50C7C7"
      iconColor="#fff"
      style={{ width: 30, height: 30, marginTop: 20, marginLeft: 5 }}
      onPress={() => acceptApplicant()}
   />

   if (props.data.UserEvent.statusApplicant) {
      button = <Button
         onlyIcon
         icon="attach-money"
         iconFamily="MaterialIcons"
         iconSize={20}
         color="error"
         iconColor="#fff"
         style={{ width: 30, height: 30, marginTop: 20, }}
         onPress={() => props.navigation.navigate('Barcode Scanner', { EventId: props.data.UserEvent.EventId, UserId: props.data.id })}
      />
   }

   if (props.data.UserEvent.statusPayment) {
      button =
         <Block middle>
            <Text b muted>Paid</Text>
         </Block>
   }

   return (
      <>
         <Block row style={{ marginVertical: 5 }}>
            <TouchableOpacity onPress={() => props.navigation.navigate('People Profile', {data: props.data})}>
               <Image
                  source={{
                     uri: 'https://data.whicdn.com/images/324482590/original.jpg',
                     height: 50, width: 50
                  }}
                  style={{ borderRadius: 100, marginTop: 10, marginBottom: 10 }}
               />
            </TouchableOpacity>
            <Block style={{ marginLeft: 10, width: 170 }}>
               <Text p>{props.data.name}</Text>
               <Text muted italic>fee: {props.data.UserEvent.payment}</Text>
               <Text muted italic>status: {StatusApplicant}</Text>
            </Block>
            <Block row space='evenly' style={{ width: 100}}>
               {/* <Button
                  onlyIcon
                  icon="attach-money"
                  iconFamily="MaterialIcons"
                  iconSize={20}
                  color="#50C7C7"
                  iconColor="#fff"
                  style={{ width: 30, height: 30, marginTop: 20, }}
                  onPress={() => props.navigation.navigate('Barcode Scanner')}
               />
               <Button
               onlyIcon
               icon="close"
               iconFamily="antdesign"
               iconSize={20}
               color="error"
               iconColor="#fff"
               style={{ width: 30, height: 30, marginTop: 20, marginLeft: 5 }}
               // INI KALO REJECT
            />
               <Button
                  onlyIcon
                  icon="check"
                  iconFamily="antdesign"
                  iconSize={20}
                  color="#50C7C7"
                  iconColor="#fff"
                  style={{ width: 30, height: 30, marginTop: 20, marginLeft: 5 }} /> */}

               {button}

            </Block>
         </Block>
      </>
   )
}

const styles = StyleSheet.create({

})