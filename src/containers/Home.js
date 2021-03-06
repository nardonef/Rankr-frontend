import React, {useEffect, useState, useRef} from 'react';
import {Text, ScrollView, StyleSheet, SafeAreaView, View, TouchableOpacity, ActivityIndicator} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import api from "../api";
import {deleteToken} from "../redux/actions";
import StyleConsts from "../style/styleConstants";
import Loader from '../components/loader'
import FlashMessage from "react-native-flash-message";
import _ from 'lodash';
import Collection from '../components/collection'

const Home = ({navigation}) => {
    const [collections, setCollections] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const errorMessageRef = useRef(null);

    const dispatch = useDispatch();
    const {tokens, email} = useSelector(state => state);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (_.isEmpty(tokens)) {
            return;
        }

        refreshCollections();
    }, [isFocused, tokens]);

    const refreshCollections = async () => {
        setShowLoader(true);
        console.log('hit');

        try {
            const response = await api('GET', '/collection', tokens, email);
            setCollections(response);
        } catch (e) {
            console.log(e);
            errorMessageRef.current.showMessage({
                message: "Error fetching Collections",
                type: "danger",
            });
        }
        setShowLoader(false);
    }

    const logOut = () => {
        dispatch(deleteToken())
        navigation.navigate('LogIn')
    }

    return (
        <SafeAreaView style={styles.container}>
            {showLoader && <Loader/>}
            <Text
                style={styles.plus}
                onPress={() => navigation.navigate('AddCollection', {refreshCollections})}
            >
                +
            </Text>
            <ScrollView style={styles.scrollView}>
                {collections && collections.map((collection) => {
                    return <Collection navigation={navigation} collection={collection}/>
                })}
            </ScrollView>
            <Text style={styles.logOut} onPress={logOut}>LOGOUT</Text>
            <FlashMessage ref={errorMessageRef} position="top" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        width: '100%',
        backgroundColor: StyleConsts.backgroundColor,
        borderTopWidth: .3,
        borderBottomWidth: .3,
        borderColor: 'black',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: StyleConsts.backgroundColor
    },
    plus: {
        fontSize: 40,
        fontWeight: "bold",
        alignSelf: 'flex-end',
        color: StyleConsts.secondaryColor,
        paddingRight: StyleConsts.margin
    },
    logOut: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: StyleConsts.secondaryColor,
        paddingTop: StyleConsts.margin
    },
    loading: StyleConsts.loading,
});


export default Home;
