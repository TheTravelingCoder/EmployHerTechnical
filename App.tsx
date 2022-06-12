import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React from 'react';
import axios from 'axios';
import config from './config';

export default function App() {
  const [lat, setLat] = React.useState('');
  const [lon, setLon] = React.useState('');
  const ApiKey = config.ApiKey;
  const [text2, setText2] = React.useState('');

  const submit = () => {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=${ApiKey}&format=xml&by=position&lat=${lat}&lng=${lon}`).then((res) => {
      let XML = res.data;
      var mySubString = XML.substring(
        XML.indexOf("<formatted>") + 11, 
        XML.lastIndexOf("</formatted>")
      );
      setText2(mySubString);
      console.log(mySubString, text2);
    });
  }

  

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>{text2}</Text>
      <View>
      <br></br>
        <Text>Latitude:</Text>
        <TextInput 
          keyboardType="default"
          onChangeText={(text) => setLat(text)}
          value={lat}
          placeholder="Latitude"
        ></TextInput >

        <br></br>
        <Text>Longitude: </Text>
        <TextInput 
          keyboardType="default"
          onChangeText={(text) => setLon(text)}
          value={lon}
          placeholder="Longitude"
        ></TextInput >
        <br></br>
      </View>
      
      <Button
        title="Submit Latitude and Longitude"
        accessibilityLabel="increment"
        onPress={submit}
        color="blue"
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
