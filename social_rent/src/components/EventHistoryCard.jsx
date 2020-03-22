import React from 'react';
import {
   StyleSheet,
   ScrollView,
   View,
   TouchableOpacity,
   Image
} from 'react-native'
import { Text, Block, theme } from 'galio-framework'


export default function EventHistoryCard(props) {

   return (
      <>
         <Block middle>
            <Block left style={styles.card}>
               {/* <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  kondangan
               </Text>
               <Text style={{fontSize: 15, paddingHorizontal: 20}} muted> di event ini creator meminta applicant untuk menemani untuk datang ke nihkahan keluarga besar </Text> */}
               <Block row>
                  <Image
                     source={{
                        uri: 'https://thoughtcatalog.files.wordpress.com/2016/08/bffs-2.jpg?w=1140&h=760',
                        height: 90, width: 100
                     }}
                     style={{ borderRadius: 10 }}
                  />
                  <Block left style={{margin: 10, width: 180}}>
                     <Text size={15} style={{fontWeight: 'bold', marginBottom: 5}}>kondangan</Text>
                     <Text muted>ini adalah sedikit deskripsi dari event yang ada disini</Text>
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