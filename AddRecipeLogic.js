import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "./assets/images/BackButton.png";
import Done from "./assets/images/Done.png";
import ScanBarcodeRecipe from "./ScanBarcodeRecipe";
import ScanBarcodeIMG from "./assets/images/ScanBarcodeIMG.png";

function AddRecipeLogic({ onBack, recipes, setRecipes }) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fats, setFats] = useState("");
  const [carbs, setCarbs] = useState("");
  const [sugar, setSugar] = useState("");
  const [instructions, setInstructions] = useState("");
  const [showScanBarcodeRecipe, setShowScanBarcodeRecipe] = useState(false);

  const submitRecipe = async () => {
    const newRecipe = {
      name,
      calories,
      protein,
      fats,
      carbs,
      sugar,
      instructions,
    };
    const newRecipes = [newRecipe, ...recipes];
    await AsyncStorage.setItem("recipes", JSON.stringify(newRecipes));
    setRecipes(newRecipes);
    onBack();
  };

  const handleBarcodeScanned = (data) => {
    console.log("Barcode scanned:", data);
    // Set the state variables with the scanned data
    setName(data.productName || "");
    console.log("Name set:", data.productName || "");
    setCalories(data.energy || 0);
    console.log("Calories set:", data.energy || 0);
    setProtein(data.proteins || 0);
    console.log("Protein set:", data.proteins || 0);
    setFats(data.fats || 0);
    console.log("Fats set:", data.fats || 0);
    setCarbs(data.carbohydrates || 0);
    console.log("Carbs set:", data.carbohydrates || 0);
    setSugar(data.sugars || 0);
    console.log("Sugar set:", data.sugars || 0);
    // You can also set the instructions if they are included in the data
    // setInstructions(data.instructions || '');
    // Hide the ScanBarcode component after setting the state
    setShowScanBarcodeRecipe(false);
  };

  if (showScanBarcodeRecipe) {
    return (
      <View style={styles.barcodeBackground}>
        <TouchableOpacity onPress={() => setShowScanBarcodeRecipe(false)} style={styles.backButtonContainer}>
          <Image source={BackButton} style={styles.backButtonImage} />
        </TouchableOpacity>
        <View style={styles.scanBarcodeContainer}>
          <ScanBarcodeRecipe
            onBack={() => setShowScanBarcodeRecipe(false)}
            onBarcodeScanned={handleBarcodeScanned}
          />
        </View>
      </View>
    );
  }



  const handleButtonPress = () => {
    setShowScanBarcodeRecipe(true);
    console.log(showScanBarcodeRecipe); // Add this line
  };


  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onBack}>
          <Image source={BackButton} style={{ width: 35, height: 35 }} />
        </TouchableOpacity>
        <View style={styles.middleButtonContainer}>
      <TouchableOpacity onPress={handleButtonPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
  <Image style={styles.buttonImage} source={ScanBarcodeIMG} />
</TouchableOpacity>
      </View>
        <TouchableOpacity onPress={submitRecipe}>
          <Image source={Done} style={{ width: 35, height: 35, }} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.leftInputs}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="white"
          />
          <TextInput
            style={styles.input}
            placeholder="Calories"
            placeholderTextColor="white"
            value={calories.toString()}
            onChangeText={(text) => setCalories(Number(text))}
            keyboardType="numeric"
            color="white"
          />
          <TextInput
            style={styles.input}
            placeholder="Protein"
            placeholderTextColor="white"
            value={protein.toString()}
            onChangeText={(text) => setProtein(Number(text))}
            keyboardType="numeric"
            color="white"
          />
          <TextInput
            style={styles.input}
            placeholder="Fats"
            placeholderTextColor="white"
            value={fats.toString()}
            onChangeText={(text) => setFats(Number(text))}
            keyboardType="numeric"
            color="white"
          />
          <TextInput
            style={styles.input}
            placeholder="Carbs"
            placeholderTextColor="white"
            value={carbs.toString()}
            onChangeText={(text) => setCarbs(Number(text))}
            keyboardType="numeric"
            color="white"
          />
          <TextInput
            style={styles.input}
            placeholder="Sugar"
            placeholderTextColor="white"
            value={sugar.toString()}
            onChangeText={(text) => setSugar(Number(text))}
            keyboardType="numeric"
            color="white"
          />
        </View>
        <TextInput
          placeholder="Instructions"
          value={instructions}
          onChangeText={setInstructions}
          style={styles.instructionsInput}
          placeholderTextColor="white"
          multiline // Allow multiple lines
          textAlignVertical="top" // Align text to the top
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#17181a", // Tan background color
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
  },
  leftInputs: {
    flex: 0.5, // Adjust to take up half the space
    marginRight: 10, // Add space to the right
  },
  input: {
    height: 40,
    borderColor: "#232526",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#232526",
    borderRadius: 10,
    color: "white",
  },
  instructionsInput: {
    flex: 0.5, // Adjust to take up half the space
    borderColor: "#232526",
    borderWidth: 1,
    paddingLeft: 10,
    height: "43%", // Fill the height of the container
    backgroundColor: "#232526",
    borderRadius: 10,
    color: "white",
  },
  buttonImage: {
    width: 35, // Or whatever size you want
    height: 35, // Or whatever size you want
    alignItems: "center",
    
  },
  middleButtonContainer: {
    position: "absolute",
    left: "45%",
    top: "1.5%",
  },
  scanBarcodeContainer: {
    width: '100%', // Adjust width as needed
    height: '50%', // Adjust height as needed
    alignSelf: 'center', // Center the component horizontally
    marginTop: '40%',
    backgroundColor: '#17181a',
  },
  barcodeBackground: {
    height: '100%', // Fill the height of the container
    width: '100%', // Fill the width of the container
    backgroundColor: '#17181a',
  },
  backButtonContainer: {
    position: 'absolute',
    top: '10%', // Adjust the value as needed for your layout
    left: '45%', // Adjust the value as needed for your layout
    zIndex: 10, // Ensure the button is clickable over other elements
  },
  backButtonImage: {
    width: 50, // Adjust the size as needed
    height: 50, // Adjust the size as needed
  },
});

export default AddRecipeLogic;