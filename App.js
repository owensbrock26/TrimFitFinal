import React from "react";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecipesListLogic from "./RecipesListLogic";
import CalorieTrackerLogic from "./CalorieTrackerLogic";
import { useIsFocused } from "@react-navigation/native";
import FinalTracker from "./assets/images/FinalTracker.png";
import { createStackNavigator } from "@react-navigation/stack";
import Weightlifting from "./Weightlifting";
import FinalExtra from "./assets/images/FinalExtra.png";
import ExtraWhite from "./assets/images/ExtraWhite.png";
import FinalRecipe from "./assets/images/FinalRecipe.png";
import Profile from "./Settings";
import Tools from "./Tools";




const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TrackerWhite = require("./assets/images/TrackerWhite.png");
const FoodWhite = require("./assets/images/FoodWhite.png");

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("isSignedIn").then((value) => {
      setIsSignedIn(value === "true");
    });
  }, []);

  // Function to update isSignedIn and store it in AsyncStorage
  const handleSignInSuccess = () => {
    setIsSignedIn(true);
    AsyncStorage.setItem("isSignedIn", "true");
  };

  return (
    <NavigationContainer style={{ backgroundColor: "#17181a", flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Calorie Tracker"
        name="MainTab"
        screenOptions={{
          tabBarActiveTintColor: "#17b178",
          tabBarInactiveTintColor: "white", // Light Gray
          tabBarStyle: {
            backgroundColor: "#17181a",
            borderTopLeftRadius: 0, // This will round the top left corner
            borderTopRightRadius: 0, // This will round the top right corner
            borderTopWidth: 0,
            height: 45,
          },
          headerStyle: {
            backgroundColor: "#17181a",
            borderBottomLeftRadius: 0, // This will round the bottom left corner
            borderBottomRightRadius: 0,
            borderBottomWidth: 0,
            height: 45,
          },
          headerTintColor: "white", // Light Gray
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShadowVisible: false,
        }}
      >
        <Tab.Screen
          name="Tools"
          component={Tools}
          options={{
            title: "",
            tabBarIcon: ({ size }) => {
              const isFocused = useIsFocused();
              return (
                <View style={isFocused ? styles.focusedIcon : null}>
                  <Image
                    source={isFocused ? FinalExtra : ExtraWhite}
                    style={{
                      width: size,
                      height: size,
                    }}
                  />
                </View>
              );
            },
          }}
        />

        <Tab.Screen
          name="Calorie Tracker"
          component={CalorieTrackerLogic}
          options={{
            title: "",
            tabBarIcon: ({ size }) => {
              const isFocused = useIsFocused();
              return (
                <View style={isFocused ? styles.focusedIcon : null}>
                  <Image
                    source={isFocused ? FinalTracker : TrackerWhite}
                    style={{
                      width: size,
                      height: size,
                    }}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Recipes"
          component={RecipesListLogic}
          options={{
            title: "",
            tabBarIcon: ({ size }) => {
              const isFocused = useIsFocused();
              return (
                <View style={isFocused ? styles.focusedIcon : null}>
                  <Image
                    source={isFocused ? FinalRecipe : FoodWhite}
                    style={{
                      width: size,
                      height: size,
                    }}
                  />
                  
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  clickableSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width * 0.25,
    height: 50,
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "red",
  },
});

