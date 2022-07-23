//import react native component
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React from 'react';
//import sign in methos from firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
//import authentication from firebase 
import { auth } from '../firebase';
//import Formik for building form
import { Formik } from 'formik';
//import yup for validation
import * as Yup from 'yup';

export default function Login() {

    const navigation = useNavigation()
    const userInfo = {
        email: '',
        password: '',
    }
    //login schema
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email should be an Email').required('Email required'),
        password: Yup.string().required('password required'),
    });

    const login = (users) => {
        const email = users.email;
        const password = users.password;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('loged in !');
                navigation.navigate("Home")

            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    return (
        //form with error handling
        <Formik initialValues={userInfo} validationSchema={LoginSchema} onSubmit={(values) => login(values)} >

            {({ values, handleChange, errors, handleBlur, touched, validateOnBlur, handleSubmit }) => (
                <View>
                    <View style={styles.container}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputtext}>Email</Text>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                style={errors.email && touched.email ? styles.InputError : styles.input}
                                placeholder="Sara-nassif@gmail.com"
                            />
                            {
                                errors.email && touched.email ?
                                    <Text style={styles.errorMessage}>{errors.email}</Text>
                                    : null
                            }
                            <Text style={styles.inputtext}>Password</Text>
                            <TextInput
                                onBlur={handleBlur('password')}
                                style={errors.password && touched.password ? styles.inputError : styles.input}
                                placeholder="Sara123456"
                                onChangeText={handleChange('password')}
                                secureTextEntry
                            />
                            {
                                errors.password && touched.password ?
                                    <Text style={styles.errorMessage}>{errors.password}</Text>
                                    : null
                            }
                        </View>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                                <Text style={styles.btnText} >Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subContainer}>
                        <Text style={styles.account}>dont have account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('register')}>
                            <Text style={styles.createNew}>Create account</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            )}
        </Formik>
    )
}
//ui styling
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '90%',
        marginTop: 20,
        paddingHorizontal: 15,
    },
    inputtext: {
        marginTop: 10
    },
    input: {
        // backgroundColor: 'white',
        paddingVertical: 5,
        marginBottom: 10,
        borderColor: '#E5E9F2',
        borderBottomWidth: 1.0
    },
    btn: {

    },
    btnText: {
        color: 'white',
    },
    btnContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: '#4267B2',
        paddingVertical: 20,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    errorMessage: {
        color: 'red',
    },
    subContainer: {
        paddingTop: 10
    },
    account: {
        textAlign: 'center'
    },
    createNew: {
        marginTop:10,
        textAlign: 'center',
        color: '#4267B2'
    },
});