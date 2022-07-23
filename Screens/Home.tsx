//import component from react native
import {
  ScrollView,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useRef } from "react";
//import authentication, storage and firestore dabase from firebase configuration
import { auth, db, storage } from "../firebase";

import { doc, setDoc } from "firebase/firestore";
import home1 from "../images/home1.png";
import home2 from "../images/home2.png";
import home3 from "../images/home3.png";
import insta from "../images/insta.png";

//importing BottomSheet and BottomSheetView @gorhom/bottom-sheet
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
//image picker to select a photo/video from the device
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

//modal for handling popup
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/core";

import * as Linking from "expo-linking";

export default function Home() {
  const navigation = useNavigation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [instauser, setInstaUser] = useState("");
  const [caption, setCaption] = useState("");
  const snapPoints = ["80%"];
  const sheetref = useRef<BottomSheet>(null);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  //function choose imahe
  const pickImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const src = { uri: res.uri };
    setImage(src);
    console.log(src);
  };
  //handle the image taken by camera
  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      const source = { uri: result.uri };
      console.log(source);
      setImage(source);
    }
  };

  //upload image function
  const uploadImage = async () => {
    let filename = image.uri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    //save the image in firebase firestore
    const imgRef = ref(storage, `avatar/${new Date().getTime()}-${filename}`);
    const metadata = {
      contentType: type,
      size: 1024,
    };
    try {
      let img = await fetch(image.uri);
      let bytes = await img.blob();
      const snap = await uploadBytes(imgRef, bytes, metadata);
      console.log({ snap });

      const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
      await setDoc(doc(db, "potentialFeedbacks", auth.currentUser.uid), {
        username: instauser,
        caption: caption,
        imageURL: url,
      });
      console.log("Uploaded a blob or file!");
      setImage(null);
      setModalOpen(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.firstContainer, { opacity: isOpen ? 0.2 : 1 }]}>
          <TouchableOpacity
            style={styles.goToProfile}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.goToProfileText}>Go to profile</Text>
          </TouchableOpacity>
          <View style={styles.secondContainer}>
            <View style={styles.item}>
              <Image source={home3} style={styles.popupapproval} />
              <Text style={styles.TextUnderImage}>
                Take photo for your food
              </Text>
            </View>
            <View style={styles.item}>
              <Image source={home1} style={styles.popupapproval} />
              <Text style={styles.TextUnderImage}>
                Tshare it on <Text style={styles.BoldText}> Resto Scenes</Text>{" "}
                account
              </Text>
            </View>
            <View style={styles.item}>
              <Image source={home2} style={styles.popupapproval} />
              <Text style={styles.TextUnderImage}>
                photo will be posted once approved
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.ShareBtn}
            onPress={() => setIsOpen(true)}
          >
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.linkText}
              onPress={() =>
                Linking.openURL("")
              }
            >
              Go to the restoscenes insta account
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.instaLogoContainer}>
            <Image source={insta} style={styles.instaLogo} />
            <Text style={styles.instaText}>restoscenes</Text>
          </View>
          <View style={styles.ImagesContainer}>
            <Image source={home1} style={styles.instaImages} />
            <Image source={home1} style={styles.instaImages} />
            <Image source={home1} style={styles.instaImages} />
            <Image source={home1} style={styles.instaImages} />
            <Image source={home1} style={styles.instaImages} />
          </View>
        </View>

        {isOpen ? (
          <BottomSheet
            ref={sheetref}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onClose={() => setIsOpen(false)}
          >
            <BottomSheetView style={styles.bottomSheet}>
              <View style={styles.bottomSheetHeaderContainer}>
                <TextInput
                  style={styles.instaUsername}
                  placeholder="Enter your instagram username *"
                  onChangeText={(text) => setInstaUser(text)}
                />
                <TextInput
                  style={styles.instacaption}
                  placeholder="Enter caption here (include hashtags)*"
                  onChangeText={(text) => setCaption(text)}
                />

                <Text>Photo*</Text>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.UploadButton}
                    onPress={pickImage}
                  >
                    <Text style={styles.UploadText}>Upload photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.TakePhotoBtn}>
                    <Text style={styles.TakePhotoText} onPress={openCamera}>
                      Take photo
                    </Text>
                  </TouchableOpacity>
                </View>
                {image ? (
                  <Image
                    source={{ uri: image.uri }}
                    style={{ width: 100, height: 100 }}
                  />
                ) : null}
                <TouchableOpacity
                  style={styles.sendImgBtn}
                  onPress={uploadImage}
                >
                  <Text style={styles.UploadText}>Share</Text>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheet>
        ) : null}

        <Modal isVisible={isModalOpen}>
          <View style={styles.modalContainer}>
            <Text style={styles.thanksMessage}>
              Your post is pending approval; Thank You!
            </Text>
            <View style={styles.btnOkayContainer}>
              <TouchableOpacity style={styles.YesBtn} onPress={toggleModal}>
                <Text style={styles.YesText}>Okay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
//ui styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fAfBfc",
  },
  goToProfileText: {
    marginTop: 6,
    color: '#4267B2',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginBottom:10
  },
  firstContainer: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    marginTop: 15,
  },
  secondContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  item: {
    width: 100,
    alignItems: "center",
  },
  popupapproval: {
    width: 70,
    height: 70,
  },
  BoldText: {
    fontWeight: "bold",
  },
  TextUnderImage: {
    textAlign: "center",
  },
  linkText: {
    fontSize: 15,
    textAlign: "center",
    color: "#7C172F",
    textDecorationLine: "underline",
  },
  ShareBtn: {
    borderWidth: 1,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#4267B2",
    marginTop: 15,
    marginBottom: 20,
  },
  shareText: {
    color: "#4267B2",
    fontSize: 18,
  },
  bottomContainer: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    marginTop: 15,
  },
  instaLogoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  instaLogo: {
    width: 30,
    height: 30,
  },
  instaText: {
    marginLeft: 7,
    fontWeight: "bold",
  },
  ImagesContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  instaImages: {
    width: "30%",
    height: 100,
    margin: 3,
  },
  UploadButton: {
    borderWidth: 2,
    alignItems: "center",
    width: "45%",
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#4267B2",
    marginTop: 25,
    marginBottom: 20,
  },
  TakePhotoBtn: {
    borderWidth: 2,
    alignItems: "center",
    width: "45%",
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#7C172F",
    marginTop: 25,
    marginBottom: 20,
  },
  UploadText: {
    color: "#4267B2",
    fontSize: 18,
  },
  TakePhotoText: {
    color: "#7C172F",
    fontSize: 18,
  },
  sendImgBtn: {
    borderWidth: 2,
    alignItems: "center",
    width: "100%",
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#4267B2",
    marginTop: 25,
    marginBottom: 20,
  },
  bottomSheet: {
    display: "flex",
    alignItems: "center",
  },
  bottomSheetHeaderContainer: {
    width: "80%",
  },
  instaUsername: {
    borderWidth: 1,
    borderColor: "#E5E9F2",
    borderRadius: 5,
    marginTop: 15,
    paddingVertical: 10,
    paddingLeft:10,
  },
  instacaption: {
    borderWidth: 1,
    borderColor: "#E5E9F2",
    borderRadius: 5,
    paddingVertical:20,
    marginTop: 15,
    marginBottom: 10,
    paddingLeft:10,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalContainer: {
    backgroundColor: "white",
    height: 150,
    borderRadius: 15,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    paddingHorizontal:20,
    paddingTop:20
  },
  YesBtn: {
    borderWidth: 1,
    width: "40%",
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#4267B2",
    margin: 7,
    backgroundColor: "#4267B2",
  },
  YesText: {
    color: "white",
  },
  thanksMessage: {
    textAlign: "center",
  },
  btnOkayContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop:20,

  },
  goToProfile: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderColor: "#4487AF",
    marginBottom: 20,
  },
});
