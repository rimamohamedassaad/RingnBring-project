//import react native component 
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React from 'react';
//import authentication and firestore dabase from firebase configuration

import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/core';

//importing create new user function from firebase authentication
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore';
//import Formik for building form
import { Formik } from 'formik';
//import yup for validation
import * as Yup from 'yup';

const Register = () => {

    const navigation = useNavigation()

    const userInfo = {
        email: '',
        password: '',
    }
    //validation schema 
    const createUserSchema = Yup.object().shape({
        email: Yup.string().email('Email should be an Email').required('Email required'),
        password: Yup.string().required('password required').min(5, ' password must be at least 6 caracter ')
    });
    //sign uo function
    const createUser = (user) => {

        const email = user.email;
        const password = user.password;

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log('result', result);
                navigation.navigate("Home")
                setDoc(doc(db, "accounts", auth.currentUser.uid), {
                    eamil: email,
                })
            })
            .catch((error) => {
                console.log(error.message);
                console.log(error.code);
            })
    }

    return (
        <Formik initialValues={userInfo} validationSchema={createUserSchema} onSubmit={(values) => createUser(values)} >

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
                                <Text style={styles.btnText} >create account</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subContainer}>
                            <Text style={styles.account}>already have account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.createNew}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </Formik>
    )
}
export default Register

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
        marginTop: 10,
        textAlign: 'center',
        color: '#4267B2'
    },
});