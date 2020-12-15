import React, {useState, useRef} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    StatusBar, TouchableOpacity
} from 'react-native';
import {useDispatch } from 'react-redux'
import {addToken, addEmail} from '../redux/actions'
import api from '../api'
import StyleConsts from "../style/styleConstants";
import Loader from '../components/loader'
import FlashMessage from "react-native-flash-message";


const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [showLoader, setShowLoader] = useState(false);
    const errorMessageRef = useRef(null);

    const dispatch = useDispatch();
    const addTokens = token => dispatch(addToken(token))
    const addEmails = email => dispatch(addEmail(email))


    const signUp = async () => {
        setShowLoader(true);
        try {
            const response = await api('POST', '/sign-up', null, null, {
                email: email,
                password: password,
            })
            if (response.success) {
                await onSignUp();
            } else {
                throw {};
            }
        } catch (e) {
            console.log(e);

            errorMessageRef.current.showMessage({
                message: 'Error signing up',
                type: "danger",
            });
        }
        setShowLoader(false);
    }

    const onSignUp = async () => {
        const response = await api('POST', '/log-in', null, null, {
            email: email,
            password: password,
        })
        addEmails(email);
        addTokens(response);
        setShowLoader(false);
        navigation.navigate('Home');
    }

    return (
        <SafeAreaView style={styles.screen}>
            {showLoader && <Loader/>}
            <View style={styles.container}>
                <Text style={styles.logInText}>Sign Up</Text>
                <View>
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />
                </View>
                <View style={{marginTop: 40}}>
                    <Text style={styles.inputText}>Password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setPassword(text)}
                        value={password}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={signUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('LogIn')}>
                    <Text style={styles.buttonText}>Go To Log In</Text>
                </TouchableOpacity>
            </View>
            <FlashMessage ref={errorMessageRef} position="top" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        backgroundColor: StyleConsts.backgroundColor,
    },
    container: {
        paddingLeft: '20%',
        paddingRight: '20%',
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
    },
    logInText: {
        paddingTop: '50%',
        paddingBottom: '30%',
        fontWeight: 'bold',
        textAlign: 'center',
        color: StyleConsts.secondaryColor,
    },
    inputText: {
        paddingTop: 5,
        paddingBottom: 5,
        color: StyleConsts.secondaryColor,
    },
    input: {
        width: '100%',
        height: 20,
        borderBottomColor: StyleConsts.secondaryColor,
        borderBottomWidth: 1,
        marginTop: 3,
        color: StyleConsts.secondaryColor,
    },
});

export default SignUp;
