//import react native component
import { Text, View, TouchableOpacity, Image , StyleSheet} from 'react-native';
//import everything from react
import * as React from "react";
//import facebook Icon from expo/vector-icons
import { AntDesign } from '@expo/vector-icons';

import googleIcon from '../images/googleIcon.png';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';

export default function Landing() {
    const navigation = useNavigation()
    return (
        <NavigationContainer independent={true}>
            <View style={styles.container}>
                <Text style={styles.title}>Login to have  the full  experience and track your orders</Text>

                <TouchableOpacity style={styles.fbBtn} >
                    <AntDesign name="facebook-square" size={36} style={styles.fbBtnIcon} />
                    <Text style={styles.fbBtnText}>Continue with Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.googleBtn}>
                    <Image source={googleIcon} style={styles.googleIcon} />
                    <Text style={styles.googleText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.emailBtn} onPress={() => navigation.navigate('register')}>
                    <Text style={styles.emailText}>Continue with email</Text>
                </TouchableOpacity>

            </View>
        </NavigationContainer>
    );
}
//ui styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fAfBfc'
    },
    title: {
        textAlign: 'center',
        fontSize: 23,
        padding: (0, 25, 0, 25),
    },
    fbBtn: {
        borderWidth: 1,
        width: "90%",
        alignItems: 'center',
        height: 60,
        justifyContent: "center",
        backgroundColor: '#4267B2',
        borderRadius: 10,
        borderColor: '#4267B2',
        display: "flex",
        flexDirection: 'row',
    },
    emailBtn: {
        borderWidth: 1,
        width: "90%",
        alignItems: 'center',
        height: 60,
        justifyContent: "center",
        borderRadius: 10,
        borderColor: '#4777AF',
    },
    googleBtn: {
        borderWidth: 1,
        width: "90%",
        alignItems: 'center',
        height: 60,
        justifyContent: "center",
        borderRadius: 10,
        borderColor: '#4297B2',
        marginBottom: 13,
        marginTop: 13,
        display: "flex",
        flexDirection: 'row',
    },
    fbBtnIcon: {
        marginRight: 15,
        color: 'white',
    },
    fbBtnText: {
        color: "white",
        fontSize: 18
    },
    googleIcon: {
        width: 30,
        height: 30,
        marginRight: 15
    },
    googleText: {
        fontSize: 18
    },
    emailText: {
        color: "#4777AF",
        fontSize: 18
    }
  });