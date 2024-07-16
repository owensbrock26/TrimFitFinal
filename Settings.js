import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
  Image,
} from "react-native";
import MyBannerAdComponent from "./MyBannerAdComponent";
import BackButton from "./assets/images/BackButton.png";

const Settings = ({ setToolPage }) => {
  const PrivacyPolicy = () => {
    Linking.openURL("https://xyzsoftwarellc.netlify.app/trimfit/privacy"); // Open ESPN.com
  };

  const handleContactUsPress = () => {
    Linking.openURL("https://xyzsoftwarellc.netlify.app/trimfit/contact"); // Open NBA.com
  };

  const handleAboutUsPress = () => {
    Linking.openURL("https://xyzsoftwarellc.netlify.app/trimfit/contact"); // Open CBS.com
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButton1}>
        <TouchableOpacity
          style={styles.backButton1}
          onPress={() => setToolPage(null)}
        >
          <Image
            source={BackButton}
            style={{ width: 35, height: 35 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bannerAd}>
        <MyBannerAdComponent style={styles.bannerAd} />
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={handleContactUsPress}>
          <View>
            <Text style={styles.optionText}>Contact Us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={PrivacyPolicy}>
          <View>
            <Text style={styles.optionText}>Privacy Policy</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleAboutUsPress}>
          <View>
            <Text style={styles.optionText}>About Us</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.option}>
          <Text style={styles.optionText}>App Version: 1.1.1</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17181a",
  },
  option: {
    backgroundColor: "#232526",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  optionText: {
    color: "white",
    fontSize: 18,
  },
  optionsContainer: {
    flex: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
    marginBottom: "10%",
  },
  bannerAd: {
    width: 320,
    height: 50,
    alignSelf: "center",
    marginTop: "2%",
    marginBottom: "5%",
  },
  backButton1: {
    position: "absolute",
    top: "2%",
    left: "2%",
  },
});

export default Settings;

/*


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyBannerAdComponent from "./MyBannerAdComponent";
import BackButton from "./assets/images/BackButton.png";

const Settings = ({ setToolPage }) => {
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState("User");

  useEffect(() => {
    (async () => {
      const storedImageUri = await AsyncStorage.getItem("profileImage");
      if (storedImageUri) {
        setImageUri(storedImageUri);
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (result.cancelled) {
      console.log("User cancelled image picker");
    } else if (result.error) {
      console.log("ImagePicker Error: ", result.error);
    } else {
      const uri = result.assets[0].uri; // Change this line
      setImageUri(uri);
      try {
        await AsyncStorage.setItem("profileImage", uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleRemoveAdsPress = () => {
    if (Platform.OS === "ios") {
      // iOS-specific code to initiate purchase using StoreKit
    } else if (Platform.OS === "android") {
      // Android-specific code to initiate purchase using Google Play Billing Library
    }
  };

  const handleRestorePurchasesPress = () => {
    Linking.openURL("http://espn.com"); // Open ESPN.com
  };

  return (
    <View style={styles.container}>
       <View style={styles.backButton1}>
     <TouchableOpacity
        style={styles.backButton1}
        onPress={() => setToolPage(null)}
      >
        <Image
          source={BackButton}
          style={{ width: 35, height: 35 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      </View>
      <View style={styles.bannerAd}>
        <MyBannerAdComponent style={styles.bannerAd} />
      </View>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.profileImage}>
          {imageUri ? (
            <Image style={styles.image} source={{ uri: imageUri }} />
          ) : (
            <Text style={styles.uploadText}>Upload Image</Text>
          )}
        </TouchableOpacity>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hi {name}</Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={handleRemoveAdsPress}>
          <View>
            <Text style={styles.optionText}>Remove Ads</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={handleRestorePurchasesPress}
        >
          <View>
            <Text style={styles.optionText}>Privacy Policy</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //    justifyContent: 'center',
    //     alignItems: 'center',
    backgroundColor: "#17181a",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#17b178",
    borderWidth: 5,
    marginTop: "10%",
  },
  profileContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "#17b178",
    borderWidth: 5,
  },
  uploadText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: "0%", // Adjust this value as needed
  },
  absoluteFill: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  option: {
    backgroundColor: "#232526",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  optionText: {
    color: "white",
    fontSize: 18,
  },
  optionsContainer: {
    flex: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  greetingText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  greetingContainer: {
    backgroundColor: "#232526",
    padding: 10,
    alignItems: "center",
    alignSelf: "stretch",
    borderColor: "#17b178",
    borderWidth: "5",

    borderRadius: 10,
    marginHorizontal: 20,
  },
  bannerAd: {
    width: 320,
    height: 50,
    alignSelf: "center", // Centers the ad horizontally
    marginTop: "2%", // Adjusts the space from the top
    marginBottom: "5%", // Adjusts the space from the bottom
  },
  backButton1: {
    position: "absolute",
    top: '2%',
    left: '2%',
  },
});

export default Settings;

*/
