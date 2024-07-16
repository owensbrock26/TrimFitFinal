import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import BackButton from "./assets/images/BackButton.png";

import AsyncStorage from "@react-native-async-storage/async-storage";


const StepCounter = ({ steps, setSteps }) => {
  useEffect(() => {
    let subscription;
    Pedometer.isAvailableAsync().then(
      (result) => {
        if (result) {
          subscription = Pedometer.watchStepCount((result) => {
            setSteps(result.steps);
          });
        }
      },
      (error) => console.log(error)
    );

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return <Text style={styles.stepsText}>Steps: {steps}</Text>;
};

const WeightGraph = () => {
  // Replace this with your weight graph component
  return <Text style={styles.weightgraphSteps}>Weight Graph</Text>;
};

const WeightTracker = ({ setToolPage }) => {
  const [steps, setSteps] = useState(0);
  const currentWeight = 150;
  const goalWeight = 130;
  const weightDifference = currentWeight - goalWeight;

  // Load the steps from storage when the component mounts
  useEffect(() => {
    AsyncStorage.getItem("steps").then((savedSteps) => {
      if (savedSteps !== null) {
        setSteps(Number(savedSteps));
      }
    });
  }, []);

  useEffect(() => {
    const fetchSteps = async () => {
      const savedSteps = await AsyncStorage.getItem("steps");
      const lastUpdated = await AsyncStorage.getItem("lastUpdated");

      const currentDate = new Date().toDateString();
      if (lastUpdated !== currentDate) {
        setSteps(0);
        AsyncStorage.setItem("lastUpdated", currentDate);
      } else {
        setSteps(savedSteps ? Number(savedSteps) : 0);
      }
    };

    fetchSteps();
  }, []);

  // Save the steps to storage whenever they change
  useEffect(() => {
    AsyncStorage.setItem("steps", String(steps));
    AsyncStorage.setItem("lastUpdated", new Date().toDateString());
  }, [steps]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setToolPage(null)}
      >
        <Image
          source={BackButton}
          style={styles.backButton}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View style={styles.stepCounter}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-start",
            marginTop: -40,
          }}
        >
          <Image source={stepsIMG} style={{ width: 20, height: 20 }} />
          <Text style={styles.smalltextStep}>Steps</Text>
        </View>
        <StepCounter steps={steps} setSteps={setSteps} />
      </View>
      <View style={styles.weightGraph}>
        <WeightGraph />
      </View>
      <View style={styles.weightInfo}>
        <Text style={styles.infoText}>Current Weight: {currentWeight}</Text>
        <Text style={styles.infoText}>Goal Weight: {goalWeight}</Text>
        <Text style={styles.infoText}>
          Weight Difference: {weightDifference}
        </Text>
      </View>
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
  stepCounter: {
    flex: 1, // Takes up 1/4 of the space
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#232526",
    margin: 10,
    padding: 10,
    borderRadius: 35,
    overflow: "hidden",
    margin: "1%",
    marginTop: "3%",
  },
  weightGraph: {
    flex: 2, // Takes up 2/4 of the space
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#232526",
    margin: 10,
    padding: 10,
    borderRadius: 35,
    overflow: "hidden",
    margin: "3%",
  },
  weightInfo: {
    flex: 1, // Takes up 1/4 of the space
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#232526",
    margin: 10,
    padding: 10,
    text: "white",
    borderRadius: 35,
    overflow: "hidden",
    margin: "1%",
    marginBottom: "3%",
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 25,
    height: 25,
    zIndex: 1,
  },
  infoText: {
    color: "white",
  },
  weightgraphSteps: {},
  stepsText: {
    color: "white",
    fontSize: 40,
  },
  smalltextStep: {
    color: "white",
    fontSize: 20,
  },
});

export default WeightTracker;
