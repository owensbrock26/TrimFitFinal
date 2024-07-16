import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  backgroundColor,
  StyleSheet,
} from "react-native";
import SavedRecipes from "./SavedRecipes";
import CustomRecipe from "./CustomRecipe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "./assets/images/BackButton.png";
import MyBannerAdComponent from "./MyBannerAdComponent";


function AddMeal({ onBack, setSelectedMeal, setCalories, submitRecipe }) {
  const [showCustomRecipe, setShowCustomRecipe] = useState(false);
  const [showSavedRecipes, setShowSavedRecipes] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      const savedRecipes = await AsyncStorage.getItem("recipes");
      if (savedRecipes) {
        console.log(JSON.parse(savedRecipes));
      }
    };

    loadRecipes();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#17181a" }}>
      <View style={styles.bannerAd}>
      <MyBannerAdComponent style={styles.bannerAd} />
      </View>
      <TouchableOpacity onPress={onBack}>
        <Image source={BackButton} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: showSavedRecipes ? "#14B869" : "#232526",
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => {
            setShowSavedRecipes(true);
            setShowCustomRecipe(false);
          }}
        >
          <Text style={{ color: "white" }}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: showCustomRecipe ? "#14B869" : "#232526",
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => {
            setShowSavedRecipes(false);
            setShowCustomRecipe(true);
            console.log(showCustomRecipe);
          }}
        >
          <Text style={{ color: "white" }}>Custom</Text>
        </TouchableOpacity>
      </View>
      {showSavedRecipes && (
        <SavedRecipes onBack={onBack} setSelectedMeal={setSelectedMeal} />
      )}
      {showCustomRecipe && (
        <CustomRecipe
          onBack={onBack}
          setSelectedMeal={setSelectedMeal}
          setCalories={setCalories}
          submitRecipe={submitRecipe}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bannerAd: {
    width: 320,
    height: 50,
    alignSelf: 'center', // Centers the ad horizontally
    marginTop: '2%',
    marginBottom: '-8%',
  },
});


export default AddMeal;