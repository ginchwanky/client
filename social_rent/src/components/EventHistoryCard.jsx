import React, {useEffect} from 'react';
import {
   StyleSheet,
   ScrollView,
   View,
   TouchableOpacity,
   Image
} from 'react-native'
import { Text, Block, theme } from 'galio-framework'


export default function EventHistoryCard(props) {

   useEffect(() => {
      console.log(props, `INI PROPSSSSSSSSS`);
      
   }, [])
   return (
      <>
         <Block middle>
            <Block left style={styles.card}>
               <Block row>
                  <Image
                     source={{
                        uri: 'https://thoughtcatalog.files.wordpress.com/2016/08/bffs-2.jpg?w=1140&h=760',
                        height: 90, width: 100
                     }}
                     style={{ borderRadius: 10 }}
                  />
                  <Block left style={{ marginLeft: 10, width: 180 }}>
                     <Text size={15} style={{ fontWeight: 'bold', marginBottom: 5 }}>{props.data.name}</Text>
                     <Text muted>{props.data.description.slice(0, 40)}...</Text>
                     <Text muted italic size={14}>Status: {props.data.statusEvent}</Text>
                  </Block>
               </Block>
            </Block>
         </Block>
      </>
   )
}

const styles = StyleSheet.create({
   card: {
      width: 290,
      height: 90,
      borderRadius: 10,
      backgroundColor: 'aliceblue',
      marginVertical: 10
   },
   text: {
      textAlign: 'center'
   }
})