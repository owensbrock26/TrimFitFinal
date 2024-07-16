import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Done from "./assets/images/Done.png";
import ScanBarcode from "./ScanBarcode";
import ScanBarcodeIMG from "./assets/images/ScanBarcodeIMG.png";

function CustomRecipe({ onBack, setSelectedMeal }) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fats, setFats] = useState("");
  const [carbs, setCarbs] = useState("");
  const [sugar, setSugar] = useState("");
  const [instructions, setInstructions] = useState("");
  const [showScanBarcode, setShowScanBarcode] = useState(false);

  const submitRecipe = () => {
    const newRecipe = {
      name,
      calories: Number(calories),
      protein,
      fats,
      carbs,
      sugar,
      instructions,
    };
    setSelectedMeal((prevMeals) => [...prevMeals, newRecipe]);
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
    setShowScanBarcode(false);
  };

  if (showScanBarcode) {
    return (
      <View style={styles.scanBarcodeContainer}>
        <ScanBarcode
          onBack={() => setShowScanBarcode(false)}
          onBarcodeScanned={handleBarcodeScanned}
        />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      <View style={styles.button}>
      <TouchableOpacity onPress={() => setShowScanBarcode(true)}>
        <Image
          style={styles.buttonImage} // replace with your own style if needed
          source={ScanBarcodeIMG}
        />
      </TouchableOpacity>
      </View>
      <View style={styles.centeredView}>
        <TouchableOpacity onPress={submitRecipe}>
          <Image style={styles.buttonImage} source={Done} />
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.container1}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="white"
          value={name}
          onChangeText={setName}
          color="white"
        />
      </View>
      <View style={styles.container1}>
        <TextInput
          style={styles.input}
          placeholder="Calories"
          placeholderTextColor="white"
          value={calories.toString()}
          onChangeText={(text) => setCalories(Number(text))}
          keyboardType="numeric"
          color="white"
        />
      </View>
      <View style={styles.container1}>
        <TextInput
          style={styles.input}
          placeholder="Protein"
          placeholderTextColor="white"
          value={protein.toString()}
          onChangeText={(text) => setProtein(Number(text))}
          keyboardType="numeric"
          color="white"
        />
      </View>
      <View style={styles.container1}>
        <TextInput
          style={styles.input}
          placeholder="Fats"
          placeholderTextColor="white"
          value={fats.toString()}
          onChangeText={(text) => setFats(Number(text))}
          keyboardType="numeric"
          color="white"
        />
      </View>
      <View style={styles.container1}>
        <TextInput
          style={styles.input}
          placeholder="Carbs"
          placeholderTextColor="white"
          value={carbs.toString()}
          onChangeText={(text) => setCarbs(Number(text))}
          keyboardType="numeric"
          color="white"
        />
      </View>
      <View style={styles.container1}>
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
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  container: {
    padding: 20,
    height: "100%",
    zIndex: 1,
  },
  input: {
    height: 30,
    borderColor: "transparent",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,

  },
  buttonImage: {
    width: 35, // Or whatever size you want
    height: 35, // Or whatever size you want
    alignItems: "center",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  container1: {
    backgroundColor: "#232526",
    borderRadius: 10,
    borderColor: "transparent",
    borderWidth: 0,
    margin: 10, // This adds space around the outside of each element
  },
  button: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    zIndex: 3,
    marginLeft: '32%',
    marginRight: '15%',
  },
  imageContainer: {
    flexDirection: 'row', // Ensures horizontal layout
    alignItems: 'center', // Aligns items vertically in the center
  },
  scanBarcodeContainer: {
    width: '100%', // Adjust width as needed
    height: '70%', // Adjust height as needed
    alignSelf: 'center', // Center the component horizontally
    marginTop: 50,
    
  },
});

export default CustomRecipe;
