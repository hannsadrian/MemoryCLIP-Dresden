import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Image, Button, Alert} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Card, Button as B} from "react-native-paper";

export default function Scanner(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    let {navigate} = props.navigation;

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        if (isNaN(parseInt(data))) {
            Alert.alert("QR Code nicht kompatibel", "");
            navigate("Home");
        } else {
            navigate("Home");
            navigate("Article", {id: parseInt(data)});
        }
    };

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}>
            <Card style={{ marginBottom: 10, height: 350, width: 265 }}>
                <Card.Title
                    title={"QR Code scannen"}
                />
                <View style={{marginLeft: 7.5, height: 250, width: 250, backgroundColor: '#ededed', borderRadius: 5, overflow: "hidden"}}>
                    {hasPermission === null ?
                        <Text style={{marginLeft: '23%', marginTop: "45%", fontWeight: '700'}}>Erwarte Kamerazugriff</Text>
                        : hasPermission === false ?
                        <Text style={{marginLeft: '23%', marginTop: "45%", fontWeight: '700'}}>Kein Kamerazugriff</Text>
                            :
                            <BarCodeScanner
                                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                style={StyleSheet.absoluteFillObject}
                            />
                    }

                </View>
                <Card.Actions style={{alignItems: 'center'}}>
                    <B icon="close-box" mode="text" style={{marginHorizontal: 'auto'}} onPress={() => navigate("Home")}>
                        ABBRECHEN
                    </B>
                </Card.Actions>
            </Card>
        </View>
    );
}