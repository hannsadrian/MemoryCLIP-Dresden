import * as React from 'react';
import {Text, View, Image, ScrollView, StyleSheet, Button} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

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

    async search(query) {
        this.setState({search: query});
        if (query.length === 0) {
            this.setState({results: []});
            this.locationSuggestions();
            return;
        }
        let response = await axios.get(
            'https://api.memoryclip.hannsadrian.de/query?name=' + query
        );
        this.setState({results: response.data});
    }

    async locationSuggestions() {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});

        let response = await axios.get(
            'https://api.memoryclip.hannsadrian.de/query?lat=' + location.coords.latitude + "&lng=" + location.coords.longitude
        );
        this.setState({results: response.data});
    }

    componentDidMount() {
        this.locationSuggestions();
    }


    render() {
        const {search, results} = this.state;
        const {navigate} = this.props.navigation;
        return (
            <KeyboardAwareScrollView
                scrollEnabled={false}
                extraScrollHeight={results.length === 0 ? 275 : 215}
                keyboardDismissMode="on-drag">
                <View style={styles.container}>
                    <View style={styles.heading}>
                        <Text style={styles.title}>📚 Memory<Text style={{fontWeight: "600"}}>CLIP</Text></Text>
                        <Text style={styles.subheading}>
                            Dieses Projekt soll eine frei wählbare Erinnerung an möglichst
                            vielen Orten in Bezug auf die Bombardierung Dresdens bieten.
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10, paddingBottom: 15}}>
                        <Searchbar
                            placeholder="Ort suchen"
                            onChangeText={query => {
                                this.search(query);
                            }}
                            value={search}
                            style={{flex: 2}}
                        />
                        <IconButton
                            icon="qrcode"
                            mode="text"
                            size={25}
                            style={{marginLeft: 15, marginTop: 7.5}}
                            animated={true}
                            onPress={() => navigate("Scan")}
                        />
                    </View>
                </View>
                <ScrollView style={styles.scroll}>
                    {results.map((value, index) => {
                        return (
                            <Card key={index} style={{marginBottom: 10}} onPress={() => {
                                navigate("Article", {id: parseInt(value.id)})
                            }}>
                                <Card.Title
                                    title={value.name}
                                    subtitle={value.article}
                                    left={props => (
                                        <Image
                                            style={{width: 45, height: 45, borderRadius: 100}}
                                            source={{
                                                uri:
                                                    value.img[0],
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