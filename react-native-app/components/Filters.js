import * as React from 'react';
import {Chip} from 'react-native-paper';
import { Text, View, StyleSheet } from 'react-native';

class MyComponent extends React.Component {
  render() {
    return (
      <View style={{flexDirection: "row", paddingTop: 15, paddingBottom: 15}}>
        <Chip selected={true} style={{borderWidth: 1.25, marginRight: 4}} onPress={() => console.log('Pressed')}>Gebäude</Chip>
        <Chip selected={false} style={{borderWidth: 1.25, marginRight: 4}}>Plätze</Chip>
      </View>
    );
  }
}

export default MyComponent;

