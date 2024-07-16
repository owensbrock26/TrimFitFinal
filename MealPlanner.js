import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import BackButton from "./assets/images/BackButton.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MealPlanner = ({ setToolPage }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setToolPage(null)}
        style={styles.backButton}
      >
        <Image source={BackButton} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 30,
          bottom: 30,
          borderRadius: 50,
          width: 60,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#17b178",
        }}
        onPress={() => setShowAddMeal(true)}
      >
        <Text style={{ color: "white", fontSize: 30 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#17181a",
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 25,
    height: 25,
    zIndex: 1,
  },
});

export default MealPlanner;
