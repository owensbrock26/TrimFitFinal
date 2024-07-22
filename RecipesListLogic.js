import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import AddRecipeLogic from "./AddRecipeLogic"; // Make sure to import AddRecipeLogic
import { Swipeable } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import TrashCan from "./assets/images/TrashCan.png";
import BackButton from "./assets/images/BackButton.png";
import MyBannerAdComponent from "./MyBannerAdComponent";


function RecipeDetails({ recipe, onBack }) {
  return (
    <View style={styles.recipeDetailsContainer}>


      


      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Image source={BackButton} style={styles.backButtonImage} />
      </TouchableOpacity>
      <View style={styles.wordContainer}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
      </View>
      <View style={styles.wordContainer}>
        <Text style={styles.recipeDetail}>Calories: {recipe.calories}</Text>
      </View>
      <View style={styles.wordContainer}>
        <Text style={styles.recipeDetail}>Protein: {recipe.protein}</Text>
      </View>
      <View style={styles.wordContainer}>
        <Text style={styles.recipeDetail}>Carbs: {recipe.carbs}</Text>
      </View>
      <View style={styles.wordContainer}>
        <Text style={styles.recipeDetail}>Fats: {recipe.fats}</Text>
      </View>
      <View style={styles.wordContainer}>
        <Text style={styles.recipeDetail}>Sugar: {recipe.sugar}</Text>
      </View>
      <View style={[styles.wordContainer, styles.ingredientsContainer]}>
        <Text style={styles.recipeDetail}>
          Ingredients: {recipe.instructions}
        </Text>
      </View>
    </View>
  );
}

function RecipesListLogic() {
  const [recipes, setRecipes] = useState([]);
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchText, setSearchText] = useState("");

 

  useEffect(() => {
    const loadRecipes = async () => {
      const savedRecipes = await AsyncStorage.getItem("recipes");
      if (savedRecipes) {
        setRecipes(JSON.parse(savedRecipes));
      }
    };

    loadRecipes();
  }, []);

  const handleBack = () => {
    setShowAddRecipe(false);
    setSelectedRecipe(null);
  };

  const handleAddRecipe = async (recipe) => {
    const newRecipes = [...recipes, recipe].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    await AsyncStorage.setItem("recipes", JSON.stringify(newRecipes));
    setRecipes(newRecipes);
    setShowAddRecipe(false);
  };

  const addRecipe = (recipe) => {
    setRecipes((prevRecipes) => {
      return [...prevRecipes, recipe].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    });
  };

  const deleteRecipe = async (index) => {
    const newRecipes = recipes.filter((_, i) => i !== index);
    await AsyncStorage.setItem("recipes", JSON.stringify(newRecipes));
    setRecipes(newRecipes);
  };

  const viewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

 

  if (showAddRecipe) {
    return (
      <AddRecipeLogic
        onBack={handleBack}
        recipes={recipes}
        setRecipes={setRecipes}
      />
    );
  }

  if (selectedRecipe) {
    return <RecipeDetails recipe={selectedRecipe} onBack={handleBack} />;
  }

  const handleSignIn = async () => {
    await AsyncStorage.setItem("isSignedIn", JSON.stringify(false));
    // Add any additional actions you want to take after signing in
  };

/*

<View style={styles.bannerAd}>
      <MyBannerAdComponent style={styles.bannerAd} />
      </View>


*/




  return (
    <GestureHandlerRootView style={styles.container}>
      
      <TextInput
        style={styles.searchBar}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search recipes..."
        placeholderTextColor="white"
      />

      <FlatList
        data={recipes
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter((recipe) =>
            recipe.name.toLowerCase().includes(searchText.toLowerCase())
          )}
        renderItem={({ item, index }) => (
          <Swipeable
            renderRightActions={() => (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteRecipe(index)}
              >
                <Image source={TrashCan} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
            )}
          >
            <TouchableOpacity onPress={() => viewRecipe(item)}>
              <View
                style={{
                  backgroundColor: "#232526",
                  padding: 10,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  marginHorizontal: 10,
                  marginVertical: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "white" }}>{item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Swipeable>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddRecipe(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17181a",
  },
  addButton: {
    position: "absolute",
    right: 40,
    bottom: 100,
    backgroundColor: "#17b178",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: '-4.7%',
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
  },
  swipeout: {
    backgroundColor: "red",
  },
  recipeText: {
    fontSize: 35,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    padding: 20, // adjust this value to make the button larger or smaller
  },
  deleteButtonText: {
    color: "red",
    fontSize: 30, // adjust this value to make the text larger or smaller
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#000", // Change this to the color you want for the separator
  },
  recipeDetailsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#17181a", // Tan background color
  },
  backButton: {
    marginBottom: 20, // Add some margin below the back button
    borderColor: "transparent",
    borderWidth: 1,
    paddingLeft: 10,
  },
  backButtonText: {
    fontSize: 20, // Increase the font size of the back button text
    color: "black",
  },
  recipeName: {
    fontSize: 25, // Increase the font size of the recipe name
    fontWeight: "bold", // Make the recipe name bold
    borderColor: "transparent",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: "white",
  },
  recipeDetail: {
    fontSize: 20, // Increase the font size of the recipe details
    borderColor: "transparent",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: "white",
  },
  searchBar: {
    height: 40,
    borderColor: "#232526",
    backgroundColor: "#232526",
    borderWidth: 1,
    paddingLeft: 10,
    margin: 10,
    borderRadius: 10,
  },
  wordContainer: {
    backgroundColor: "#232526", // Grey background color
    padding: 10, // Add some padding
    borderRadius: 5, // Add some border radius
    marginBottom: 5, // Add some margin at the bottom
  },
  ingredientsContainer: {
    flex: 1,
  },
  backButtonImage: {
    width: 40, // Increase the width
    height: 40, // Increase the height
    borderColor: "transparent",
  },
  bannerAd: {
    width: 320,
    height: 50,
    alignSelf: 'center', // Centers the ad horizontally
    marginTop: '2%', // Adjusts the space from the top
  },
  signInButton: {
    // Style your button
    backgroundColor: "#4CAF50", // Example button color
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  signInButtonText: {
    color: "#FFFFFF", // Example text color
    textAlign: "center",
    fontSize: 20,
  },
});




/*

import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import AddRecipeLogic from "./AddRecipeLogic"; // Make sure to import AddRecipeLogic
import { Swipeable } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import TrashCan from "./assets/images/TrashCan.png";
import BackButton from "./assets/images/BackButton.png";
import MyBannerAdComponent from "./MyBannerAdComponent";


function RecipeDetails({ recipe, onBack }) {
  return (
    <View style={styles.recipeDetailsContainer}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Image source={BackButton} style={styles.backButtonImage} />
      </TouchableOpacity>
      <View style={styles.wordContainer}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
      </View>
      <View style={styles.wordContainer}>
        <Text style={styles.recipeDetail}>Calories: {recipe.calories}</Text>
      </View>
      <View style={styles.wordContainer}>
        <Text style={styles.recipeDetail}>Protein: {recipe.protein}</Text>
      </View>
      <View style={styles.wordContainer}>
        <Text style={styles.recipeDetail}>Carbs: {recipe.carbs}</Text>
      </View>
      <View style={styles.wordContainer}>
        <Text style={styles.recipeDetail}>Fats: {recipe.fats}</Text>
      </View>
      <View style={styles.wordContainer}>
        <Text style={styles.recipeDetail}>Sugar: {recipe.sugar}</Text>
      </View>
      <View style={[styles.wordContainer, styles.ingredientsContainer]}>
        <Text style={styles.recipeDetail}>
          Ingredients: {recipe.instructions}
        </Text>
      </View>
    </View>
  );
}

function RecipesListLogic() {
  const [recipes, setRecipes] = useState([]);
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const loadRecipes = async () => {
      const savedRecipes = await AsyncStorage.getItem("recipes");
      if (savedRecipes) {
        setRecipes(JSON.parse(savedRecipes));
      }
    };

    loadRecipes();
  }, []);

  const handleBack = () => {
    setShowAddRecipe(false);
    setSelectedRecipe(null);
  };

  const handleAddRecipe = async (recipe) => {
    const newRecipes = [...recipes, recipe].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    await AsyncStorage.setItem("recipes", JSON.stringify(newRecipes));
    setRecipes(newRecipes);
    setShowAddRecipe(false);
  };

  const addRecipe = (recipe) => {
    setRecipes((prevRecipes) => {
      return [...prevRecipes, recipe].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    });
  };

  const deleteRecipe = async (index) => {
    const newRecipes = recipes.filter((_, i) => i !== index);
    await AsyncStorage.setItem("recipes", JSON.stringify(newRecipes));
    setRecipes(newRecipes);
  };

  const viewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  if (showAddRecipe) {
    return (
      <AddRecipeLogic
        onBack={handleBack}
        recipes={recipes}
        setRecipes={setRecipes}
      />
    );
  }

  if (selectedRecipe) {
    return <RecipeDetails recipe={selectedRecipe} onBack={handleBack} />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.bannerAd}>
      <MyBannerAdComponent style={styles.bannerAd} />
      </View>
      <TextInput
        style={styles.searchBar}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search recipes..."
        placeholderTextColor="white"
      />

      <FlatList
        data={recipes
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter((recipe) =>
            recipe.name.toLowerCase().includes(searchText.toLowerCase())
          )}
        renderItem={({ item, index }) => (
          <Swipeable
            renderRightActions={() => (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteRecipe(index)}
              >
                <Image source={TrashCan} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
            )}
          >
            <TouchableOpacity onPress={() => viewRecipe(item)}>
              <View
                style={{
                  backgroundColor: "#232526",
                  padding: 10,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  marginHorizontal: 10,
                  marginVertical: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "white" }}>{item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Swipeable>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddRecipe(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17181a",
  },
  addButton: {
    position: "absolute",
    right: 40,
    bottom: 100,
    backgroundColor: "#17b178",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: '-4.7%',
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
  },
  swipeout: {
    backgroundColor: "red",
  },
  recipeText: {
    fontSize: 35,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    padding: 20, // adjust this value to make the button larger or smaller
  },
  deleteButtonText: {
    color: "red",
    fontSize: 30, // adjust this value to make the text larger or smaller
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#000", // Change this to the color you want for the separator
  },
  recipeDetailsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#17181a", // Tan background color
  },
  backButton: {
    marginBottom: 20, // Add some margin below the back button
    borderColor: "transparent",
    borderWidth: 1,
    paddingLeft: 10,
  },
  backButtonText: {
    fontSize: 20, // Increase the font size of the back button text
    color: "black",
  },
  recipeName: {
    fontSize: 25, // Increase the font size of the recipe name
    fontWeight: "bold", // Make the recipe name bold
    borderColor: "transparent",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: "white",
  },
  recipeDetail: {
    fontSize: 20, // Increase the font size of the recipe details
    borderColor: "transparent",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: "white",
  },
  searchBar: {
    height: 40,
    borderColor: "#232526",
    backgroundColor: "#232526",
    borderWidth: 1,
    paddingLeft: 10,
    margin: 10,
    borderRadius: 10,
  },
  wordContainer: {
    backgroundColor: "#232526", // Grey background color
    padding: 10, // Add some padding
    borderRadius: 5, // Add some border radius
    marginBottom: 5, // Add some margin at the bottom
  },
  ingredientsContainer: {
    flex: 1,
  },
  backButtonImage: {
    width: 40, // Increase the width
    height: 40, // Increase the height
    borderColor: "transparent",
  },
  bannerAd: {
    width: 320,
    height: 50,
    alignSelf: 'center', // Centers the ad horizontally
    marginTop: '2%', // Adjusts the space from the top
  },
});






*/


export default RecipesListLogic;