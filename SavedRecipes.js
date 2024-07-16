import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SavedRecipes = ({ setSelectedMeal, onBack }) => {
  console.log("In SavedRecipes, setSelectedMeal is:", setSelectedMeal);
  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const loadRecipes = async () => {
      const savedRecipes = await AsyncStorage.getItem("recipes");
      if (savedRecipes) {
        setRecipes(
          JSON.parse(savedRecipes).sort((a, b) => a.name.localeCompare(b.name))
        );
      }
    };

    loadRecipes();
  }, []);

  const handleMealClick = (meal) => {
    console.log("In SavedRecipes, meal being set is:", meal);
    setSelectedMeal((prevMeals) => [...prevMeals, meal]);
    onBack();
  };

  const handleChangeText = (text) => {
    setSearchText(text);
  };

  const filteredRecipes = recipes
    ? recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  // Inside SavedRecipes component

  return (
    <View style={{ flex: 1 }}> 
      <TextInput
        value={searchText}
        onChangeText={handleChangeText}
        placeholder="Search..."
        placeholderTextColor='white'
        style={styles.searchInput}
      />
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.recipeContainer} onPress={() => handleMealClick(item)}>
            <Text style={{ color: 'white' }}>{String(item.name)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};




const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: '#232526', // Add this line
    borderColor: '#232526', // Add this line
    borderWidth: 1, // Add this line
    marginBottom : 10, // Add this line
    marginTop : 10, // Add this line
    height: 30, // Add this line
    marginLeft: 10, // Add this line
    marginRight: 10, // Add this line
    borderRadius: 10,
    paddingLeft: 10,
  },
  recipeContainer: {
    backgroundColor: '#232526', // Add this style
    marginBottom: 10, // Add this style
    marginLeft: 10, // Add this style
    marginRight: 10, // Add this style
    borderRadius: 10,
    height: 30, // Add this style
    justifyContent: 'center', // Add this line
    alignItems: 'flex-start', // This aligns the text to the left
    paddingLeft: 10,
  },
});

export default SavedRecipes;