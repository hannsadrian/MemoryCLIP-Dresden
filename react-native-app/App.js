import * as React from 'react';
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Constants from 'expo-constants';
import Filters from './components/Filters';

import {
  Title,
  Subheading,
  Searchbar,
  IconButton,
  Card,
  Avatar,
} from 'react-native-paper';

const axios = require('axios').default;

export default class App extends React.Component {
  state = {
    search: '',
    results: [],
  };

  async search(query) {
    console.log(query);
    this.setState({ search: query });
    let response = await axios.get(
      'https://gewibackend.hannsadrian.de/query/building?name=' + query
    );
    this.setState({ results: response.data });
    console.log(this.state.results);
  }

  render() {
    const { search, results } = this.state;
    return (
      <KeyboardAwareScrollView
        scrollEnabled={true}
        extraScrollHeight={215}
        keyboardDismissMode="on-drag">
        <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title}>Memory<Text style={{fontWeight: "700"}}>CLIP</Text></Text>
          <Text style={styles.subheading}>
            Dieses Projekt soll eine unverbindliche Erinnerung an möglichst
            vielen Orten im Bezug auf die Bombardierung von Dresden bieten.
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Searchbar
            placeholder="Ort suchen"
            onChangeText={query => {
              this.search(query);
            }}
            value={search}
            style={{ flex: 2 }}
          />
          <IconButton
            icon="qrcode"
            mode="text"
            size={25}
            style={{ marginLeft: 15, marginTop: 7.5 }}
            animated={true}
          />
        </View>
        <Filters />
        </View>
        <ScrollView style={styles.scroll}>
          {results.map((value, index) => {
            return (
              <Card style={{ marginBottom: 10 }} onPress={() => {console.log("clicked " + value.name)}}>
                <Card.Title
                  title={value.name}
                  subtitle={value.article}
                  left={props => (
                    <Image
                      style={{ width: 45, height: 45, borderRadius: 100 }}
                      source={{
                        uri:
                          value.img,
                      }}
                    />
                  )}
                />
              </Card>
            );
          })}
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    paddingTop: Constants.statusBarHeight + 40,
    backgroundColor: '#ecf0f1',
    padding: 18,
    paddingBottom: 0
  },
  scroll: {
    flex: 1,
    justifyContent: 'top',
    backgroundColor: '#ecf0f1',
    paddingLeft: 18,
    paddingRight: 18,
    minHeight: "120%"
  },
  heading: {
    margin: 12,
    marginLeft: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
    marginBottom: 10,
  },
});
