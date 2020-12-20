import React, {useState, useRef} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { useSelector } from 'react-redux'
import api from "../api";
import FlashMessage from "react-native-flash-message";
import StyleConsts from "../style/styleConstants";
import Loader from '../components/loader'

const AddCollection = ({navigation, route}) => {
    const [name, setName] = useState('');
    const [type, setType] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const errorMessageRef = useRef(null);
    const {tokens, email} = useSelector(state => state);

    const onSubmit = async () => {
        if (name === '' || !type) {
            return;
        }
        setShowLoader(true);
        try {
            await api('POST', '/collection', tokens, email, {
                name: name,
                type: type,
            });

            route.params.refreshCollections();
            setShowLoader(false);
            navigation.navigate('Home');
        } catch (e) {
            errorMessageRef.current.showMessage({
                message: 'Error creating collection',
                type: "danger",
            });
        }
        setShowLoader(false);
    }

    return (
        <SafeAreaView style={styles.sav}>
            {showLoader && <Loader/>}
            <View style={styles.container}>
                <Text
                    style={styles.back}
                    onPress={() => navigation.goBack()}
                >
                    GO BACK
                </Text>
                <View style={styles.body}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            onChangeText={text => setName(text)}
                            value={name}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Type:</Text>
                        <View style={styles.picker}>
                            <RNPickerSelect
                                textInputProps={{
                                    color: StyleConsts.secondaryColor,
                                }}
                                placeholder={{
                                    label: 'Select a type...',
                                    value: null,
                                }}
                                placeholderTextColor="white"
                                onValueChange={(value) => setType(value)}
                                items={[
                                    { label: 'Movies', value: 'movies' },
                                    { label: 'TV Shows', value: 'tv' },
                                    { label: 'Restaurants', value: 'restaurants' },
                                    { label: 'Beer', value: 'beer' },
                                    { label: 'Whiskey', value: 'whiskey' },
                                ]}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onSubmit}>
                        <Text style={styles.buttonText}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlashMessage ref={errorMessageRef} position="top" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: StyleConsts.smallMargin,
        paddingLeft: StyleConsts.largeMargin,
        paddingRight: StyleConsts.largeMargin,
        backgroundColor: StyleConsts.backgroundColor,

    },
    sav: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: StyleConsts.backgroundColor,
    },
    body: {
        marginTop: 125
    },
    row: {
        flexDirection: 'row',
        marginTop: 75,

    },
    input: {
        width: 200,
        height: 20,
        borderBottomColor: StyleConsts.secondaryColor,
        borderBottomWidth: 1,
        marginLeft: StyleConsts.margin,
        marginTop: 3,
        color: StyleConsts.secondaryColor,
    },
    picker: {
        width: 200,
        height: 20,
        marginLeft: 27,
        marginTop: 5,
        borderBottomColor: StyleConsts.secondaryColor,
        borderBottomWidth: 1,
        color: StyleConsts.secondaryColor,
    },
    label: {
        fontSize: StyleConsts.largeText,
        fontWeight: "bold",
        color: StyleConsts.secondaryColor,
    },
    back: {
        fontSize: StyleConsts.largeText,
        fontWeight: "bold",
        color: StyleConsts.secondaryColor,
    },
    button: {
        alignSelf: "center",
        marginTop: 60,
        borderRadius: 10,
        width: 150,
        height: 50,
        color: StyleConsts.secondaryColor,
        backgroundColor: StyleConsts.accentColor1,
        justifyContent: 'center',
    },
    buttonText: {
        color: StyleConsts.secondaryColor,
        alignSelf: 'center',
    }
});


export default AddCollection;
