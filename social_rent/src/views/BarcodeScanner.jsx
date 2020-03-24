import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axiosInstance from '../instances/axiosInstance'
import { useSelector } from 'react-redux'

export default function BarcodeScanner({ route, navigation }) {

  const access_token = useSelector(state => state.user.access_token)
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    console.log(route.params, `INI LHOOOOOOOOOOOOOOO`);

  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    Alert.alert(
      `Are you sure want to confirm your payment?`,
      `by pressing "ok" you'll commit your payment to this applicant `,
      [
        {
          text: 'Cancel'
        },
        {
          text: 'Ok', onPress: () => {
            // disini lakukan PUT untuk update status payment applicant pada event
            axiosInstance({
              method: 'put',
              url: `/userEvent/payments/${route.params.EventId}`,
              data: {
                statusPayment: true,
                UserId: data
              },
              headers: {
                access_token
              }
            })
              .then(({ data }) => {
                navigation.navigate('My Events')
              })
              .catch(err => {
                console.log(err.response, `INI ERRORRR PAYMENT`);

              })
          }
        },
      ]
    )
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
