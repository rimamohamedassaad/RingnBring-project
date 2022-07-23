import React, { useState } from 'react';
//import auth and firestore dabase from firebase configuration
import { auth, db } from '../firebase';
//import modal from react native for popup 
import Modal from "react-native-modal";

import { signOut } from 'firebase/auth';

import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { doc, updateDoc } from 'firebase/firestore';

//import Formik for building form
import { Formik } from 'formik';
//import yup for validation
import * as Yup from 'yup';

const Profile = () => {
    const navigation = useNavigation()

    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible1, setModalVisible1] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleModal1 = () => {
        setModalVisible1(!isModalVisible1);
    };

    const userInfo = {
        fullName: '',
        phoneNumber: '',
        email: auth.currentUser.email
    }

    const ProfileSchema = Yup.object().shape({
        fullName: Yup.string().required('fullName required'),
    });


    const Logout = async () => {

        signOut(auth).then((result) => {
            console.log(result);
            navigation.navigate("login")
        }).catch((error) => {
            console.log(error.message);
        });
    }

    const updateProfile = async (values) => {
        const fullName = values.fullName;
        const phoneNumber = values.phoneNumber;
        const eamil = auth.currentUser.email;
        try {
            await updateDoc(doc(db, "accounts", auth.currentUser.uid), {
                fullName: fullName,
                phoneNumber: phoneNumber,
                eamil: eamil
            })
            console.log('Profile updated');
            setModalVisible1(!isModalVisible1);
        } catch (err) {
            console.log(err.message)
        }
    }


    return (
        <Formik initialValues={userInfo} validationSchema={ProfileSchema} onSubmit={(values) => updateProfile(values)} >

            {({ values, handleChange, errors, handleBlur, touched, handleSubmit }) => (
                <View>
                    <TouchableOpacity>
                        <Text style={styles.Logout} onPress={Logout}>Logout</Text>
                    </TouchableOpacity>
                    <View style={styles.container}>
                        <View style={styles.subContainer}>
                            <Text>Full name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Sara nassif"
                                onChangeText={handleChange('fullName')}
                                onBlur={handleBlur('fullName')}
                            />
                            {
                                errors.fullName && touched.fullName ?
                                    <Text style={styles.errorMessage}>{errors.fullName}</Text>
                                    : null
                            }
                            <Text>phone number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter you phone number"
                                keyboardType="numeric"
                                onChangeText={handleChange('phoneNumber')}
                                onBlur={handleBlur('phoneNumber')}

                            />
                            <Text>Email adress</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Sara-nassif@gmail.com"
                                value={values.email}
                            />
                            <View style={styles.btnContainer}>
                                <TouchableOpacity>
                                    <Text style={styles.savebtn} onPress={handleSubmit}>save</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity>
                                    <Text style={styles.savebtn} onPress={toggleModal}>discard changes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Modal isVisible={isModalVisible}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.discardText}>Discard changes</Text>
                                <Text style={styles.discriptionText}>are you sure  want to discard changes ? By confirming all the changes will be lost </Text>
                                <View style={styles.btnContainer}>
                                    <TouchableOpacity style={styles.YesBtn} onPress={toggleModal}>
                                        <Text style={styles.YesText}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.noBtn} onPress={toggleModal}>
                                        <Text style={styles.NoText}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <Modal isVisible={isModalVisible1}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.discardText}>Profile Updatted</Text>
                                <View style={styles.btnContainer}>
                                    <TouchableOpacity style={styles.YesBtn} onPress={toggleModal1}>
                                        <Text style={styles.YesText}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                    </View>
                </View>
            )}
        </Formik>
    );
}
export default Profile

// ui styling 
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    subContainer: {
        width: '90%',
        marginTop: 30,

    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#E5E9F2',
        borderRadius: 5,
        paddingVertical: 10,
        marginBottom: 20
    },
    noBtn: {
        borderWidth: 1,
        width: "45%",
        height: 50,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 15,
        borderColor: '#4267B2',
        margin: 7
    },
    noBtnText: {
        color: "#4487AF",
        fontSize: 18,
    },
    YesBtn: {
        borderWidth: 1,
        backgroundColor: '#4267B2',
        color:"#fff",
        width: "45%",
        alignItems: 'center',
        height: 50,
        justifyContent: "center",
        borderRadius: 15,
        borderColor: '#fff',
        margin: 5,

    },
    YesBtnText: {
        color: "#fff",
        fontSize: 18,
    },
    inputError: {
        borderBottomWidth: 1,
        borderColor: '#E5E9F2',
        borderRadius: 5,
        height: 75,
        marginBottom: 15,
        borderColor: 'red'
    },
    modalContainer: {
        backgroundColor: 'white',
        height: 200,
        borderRadius: 15,
        paddingHorizontal:20,
        margin:'auto'
    },
    discardText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20
    },
    discriptionText: {
        textAlign: 'center',
        marginTop: 7,
        fontSize: 15
    },
    btnContainer: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        marginTop: 25
    },
    Logout: {
        marginTop: 5,
        color: '#4267B2',
        textDecorationLine: 'underline',
        fontSize: 16,
        position: 'absolute',
        right: 15,
    },
    errorMessage: {
        color: 'red',
        paddingBottom: 20,
        textAlign: 'center'
    }
    ,
    savebtn:{
        color:"#fff",
        backgroundColor:'#4267B2',
        width:130,
        textAlign:'center',
        paddingVertical:20,
        borderRadius:10
    }
})