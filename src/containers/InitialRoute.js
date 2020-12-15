import React, {useEffect} from 'react';
import {Text, View} from "react-native";
import {useSelector} from "react-redux";
import _ from 'lodash';

const InitialRoute = ({navigation}) => {
    const {tokens} = useSelector(state => state);
    console.log(tokens);

    useEffect(() => {
        if (_.isEmpty(tokens)) {
            navigation.navigate('LogIn');
        } else {
            navigation.navigate('Home');
        }
    }, [tokens])

    //TODO
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Splash screen?</Text>
        </View>
    );
};


export default InitialRoute;
