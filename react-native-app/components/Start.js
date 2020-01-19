import * as React from 'react';
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Constants from 'expo-constants';
import Filters from './Filters';

import {
    Title,
    Subheading,
    Searchbar,
    IconButton,
    Card,
    Avatar,
} from 'react-native-paper';

const axios = require('axios').default;

export default class Start extends React.Component {
    state = {
        search: '',
        results: [],
    };

    static navigationOptions = {
    };

    async search(query) {
        this.setState({ search: query });
        let response = await axios.get(
            'https://api.memoryclip.hannsadrian.de/query?name=' + query
        );
        this.setState({ results: response.data });
    }

    render() {
        const { search, results } = this.state;
        const {navigate} = this.props.navigation;
        return (
            <KeyboardAwareScrollView
                scrollEnabled={false}
                extraScrollHeight={225}
                keyboardDismissMode="on-drag">
                <View style={styles.container}>
                    <View style={styles.heading}>
                        <Text style={styles.title}>📚 Memory<Text style={{fontWeight: "600"}}>CLIP</Text></Text>
                        <Text style={styles.subheading}>
                            Dieses Projekt soll eine frei wählbare Erinnerung an möglichst
                            vielen Orten in Bezug auf die Bombardierung Dresdens bieten.
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
                            onPress={() => navigate("Scan")}
                        />
                    </View>
                    <Filters />
                </View>
                <ScrollView style={styles.scroll}>
                    {results.map((value, index) => {
                        return (
                            <Card key={index} style={{ marginBottom: 10 }} onPress={() => {console.log("clicked " + value.name)}}>
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
        paddingTop: Constants.statusBarHeight + 40,
        backgroundColor: '#ecf0f1',
        padding: 18,
        paddingBottom: 0
    },
    scroll: {
        flex: 1,
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