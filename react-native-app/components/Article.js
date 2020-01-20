import * as React from 'react';
import {Text, View, StyleSheet, Image, Button, Alert, ScrollView} from 'react-native';
import {Card, Button as B} from "react-native-paper";
import openMap from 'react-native-open-maps';

const axios = require('axios').default;

class Article extends React.Component {
    state = {
        article: {}
    };

    async componentDidMount() {
        const {id} = this.props.navigation.state.params;
        if (isNaN(parseInt(id)))
            return;

        const article = await axios.get("https://api.memoryclip.hannsadrian.de/entry?id=" + id).then(res => res.data);

        if (article.length === 0) {
            Alert.alert("QR Code nicht kompatibel");
            const {navigate} = this.props.navigation;
            navigate("Home");
            return;
        }

        this.setState({article: article[0]});
        console.log(this.state)
    }

    render() {
        const {article} = this.state;
        const {navigate} = this.props.navigation;
        return (
            <View style={{backgroundColor: "#ecf0f1", flex: 1}}>
                <View style={styles.container}>
                    <B icon="arrow-left" mode="text" style={{width: 110, marginLeft: 'auto'}} color={"#232323"}
                       onPress={() => navigate("Home")}>
                        ZURÜCK
                    </B>
                    <View style={styles.heading}>
                        <Text style={styles.title}>{article.name || "Laden..."}</Text>
                    </View>
                    <View style={{marginBottom: 10}}>
                        <B icon="map-marker" mode="contained" style={{marginHorizontal: 'auto', width: 100}} onPress={() => openMap({ latitude: article.coordinates.lat, longitude: article.coordinates.lng, zoom: 18, travelType: "walk" })}>Karte</B>
                    </View>
                    <ScrollView contentContainerStyle={{
                        flexGrow: 1, justifyContent: 'space-between', paddingBottom: 200, borderRadius: 10
                    }}>
                        <Image
                            style={{width: "100%", height: 300, borderRadius: 7.5}}
                            source={{
                                uri:
                                article.img && article.img[0],
                            }}
                        />
                        <Text style={{paddingTop: 10, paddingBottom: 18, fontSize: 18}}>{article.article}</Text>
                        {article.link && (<B icon="link" mode="outlined" style={{marginHorizontal: 'auto'}} onPress={() => console.log(article.link.ref)}>{article.link.name}</B>)}
                    </ScrollView>
                </View>


            </View>
        );
    }
}

export default Article;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 18,
        paddingBottom: 0,
        borderRadius: 15,
        marginTop: 22.5,
        shadowColor: '#717272',
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    scroll: {
        flex: 1,
    },
    heading: {
        margin: 12,
        marginLeft: 0,
        marginBottom: 0
    },
    title: {
        fontSize: 32,
        fontWeight: '500',
        marginBottom: 10,
    },
});