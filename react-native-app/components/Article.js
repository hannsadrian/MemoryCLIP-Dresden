import * as React from 'react';
import {Text, View, StyleSheet, Image, Button, Alert, ScrollView} from 'react-native';
import {Card, Button as B, Searchbar, IconButton} from "react-native-paper";
import Filters from "./Filters";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";

class Article extends React.Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <KeyboardAwareScrollView
                scrollEnabled={false}
                extraScrollHeight={225}
                keyboardDismissMode="on-drag">
                <View style={styles.container}>
                    <B icon="arrow-left" mode="text" style={{width: 120}} color={"#232323"} onPress={() => navigate("Home")}>
                        ZURÜCK
                    </B>
                    <View style={styles.heading}>
                        <Text style={styles.title}>Titel</Text>
                        <Text style={styles.subheading}>
                            Artikel Überschrift
                        </Text>
                    </View>
                </View>
                <ScrollView style={styles.scroll}>
                    <Text>Hello</Text>
                </ScrollView>
            </KeyboardAwareScrollView>
        );
    }
}

export default Article;

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