import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import RecipesListLogic from "./RecipesListLogic";
import calculateNutrition from "./CalorieAlg";
import AddMeal from "./AddMeal";
import { ScrollView, Swipeable } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { originalNutrition } from "./NutritionValues";
import { AppState } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Image } from "react-native";
import TrashCan from "./assets/images/TrashCan.png";
import MyBannerAdComponent from "./MyBannerAdComponent";

function CalorieTrackerLogic() {
  const [totalCalories, setTotalCalories] = useState(
    originalNutrition.calories
  );
  const [calories, setCalories] = useState(originalNutrition.calories);
  const [protein, setProtein] = useState(originalNutrition.protein);
  const [fats, setFats] = useState(originalNutrition.fats);
  const [carbs, setCarbs] = useState(originalNutrition.carbs);
  const [sugar, setSugar] = useState(originalNutrition.sugar);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [showAddMeal, setShowAddMeal] = useState(false);

  const [isProteinManuallySet, setIsProteinManuallySet] = useState(false);
  const [isFatsManuallySet, setIsFatsManuallySet] = useState(false);
  const [isCarbsManuallySet, setIsCarbsManuallySet] = useState(false);
  const [isSugarManuallySet, setIsSugarManuallySet] = useState(false);

  useEffect(() => {
    const loadTotalCalories = async () => {
      const savedTotalCalories = await AsyncStorage.getItem("@total_calories");
      if (savedTotalCalories) {
        setTotalCalories(JSON.parse(savedTotalCalories));
      }
    };

    loadTotalCalories();
  }, []);

  useEffect(() => {
    const loadNutritionValues = async () => {
      const savedProtein = await AsyncStorage.getItem("@protein");
      const savedFats = await AsyncStorage.getItem("@fats");
      const savedCarbs = await AsyncStorage.getItem("@carbs");
      const savedSugar = await AsyncStorage.getItem("@sugar");

      if (savedProtein) {
        setProtein(JSON.parse(savedProtein));
      }
      if (savedFats) {
        setFats(JSON.parse(savedFats));
      }
      if (savedCarbs) {
        setCarbs(JSON.parse(savedCarbs));
      }
      if (savedSugar) {
        setSugar(JSON.parse(savedSugar));
      }
    };

    loadNutritionValues();
  }, []);

  useEffect(() => {
    const nutrition = calculateNutrition(totalCalories);

    if (!isProteinManuallySet) setProtein(nutrition.protein);
    if (!isFatsManuallySet) setFats(nutrition.fats);
    if (!isCarbsManuallySet) setCarbs(nutrition.carbs);
    if (!isSugarManuallySet) setSugar(nutrition.sugar);
  }, [totalCalories]);

  // ... previous code

  useEffect(() => {
    const loadMeals = async () => {
      const savedMeals = await AsyncStorage.getItem("meals");
      if (savedMeals) {
        const { meals, lastUpdated } = JSON.parse(savedMeals);
        const lastUpdatedDate = new Date(lastUpdated);
        const now = new Date();

        // Check if the meals were added before the current day
        if (
          lastUpdatedDate.getDate() < now.getDate() ||
          lastUpdatedDate.getMonth() < now.getMonth() ||
          lastUpdatedDate.getFullYear() < now.getFullYear()
        ) {
          // If the meals were added before the current day, clear them
          setSelectedMeals([]);
          AsyncStorage.removeItem("meals");
        } else {
          setSelectedMeals(meals);
        }
      }
    };

    loadMeals();
  }, []);

  useEffect(() => {
    const now = new Date();
    const nextDay = new Date(now);
    nextDay.setDate(now.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);

    const msUntilMidnight = nextDay - now;

    const timerId = setTimeout(() => {
      setSelectedMeals([]);
      AsyncStorage.removeItem("meals");
    }, msUntilMidnight);

    return () => clearTimeout(timerId);
  }, []);

  // ... rest of the code

  useEffect(() => {
    const now = new Date();
    AsyncStorage.setItem(
      "meals",
      JSON.stringify({ meals: selectedMeals, lastUpdated: now })
    );
  }, [selectedMeals]);

  const handleAppStateChange = async (nextAppState) => {
    if (nextAppState === "active") {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const savedMeals = await AsyncStorage.getItem("meals");
      const mealsLastUpdated = savedMeals
        ? JSON.parse(savedMeals).lastUpdated
        : null;
      const lastUpdatedDate = mealsLastUpdated
        ? new Date(mealsLastUpdated)
        : null;

      if (lastUpdatedDate) {
        const isNextDay =
          now.getDate() !== lastUpdatedDate.getDate() ||
          now.getMonth() !== lastUpdatedDate.getMonth() ||
          now.getFullYear() !== lastUpdatedDate.getFullYear();

        if (isNextDay || (hours === 0 && minutes === 0)) {
          setSelectedMeals([]);
          AsyncStorage.removeItem("meals");
        }
      }
    }
  };

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      appStateListener.remove();
    };
  }, []);

  useEffect(() => {
    const saveNutritionValues = async () => {
      await AsyncStorage.setItem("@protein", JSON.stringify(protein));
      await AsyncStorage.setItem("@fats", JSON.stringify(fats));
      await AsyncStorage.setItem("@carbs", JSON.stringify(carbs));
      await AsyncStorage.setItem("@sugar", JSON.stringify(sugar));
    };

    saveNutritionValues();
  }, [protein, fats, carbs, sugar]);

  const addFood = (food) => {
    setSelectedMeals((prevMeals) => [
      ...prevMeals,
      { ...food, quantity: 1, createdAt: new Date().toISOString() }, // Add creation time
    ]);
  };

  const handleProteinChange = (newProtein) => {
    setProtein(newProtein);
    setIsProteinManuallySet(true);
  };

  const handleTotalCaloriesChange = (newTotalCalories) => {
    setTotalCalories(newTotalCalories);
    AsyncStorage.setItem("@total_calories", JSON.stringify(newTotalCalories));
  };

  const totalMealNutrition = (
    Array.isArray(selectedMeals) ? selectedMeals : []
  ).reduce(
    (total, meal) => {
      return {
        calories: total.calories + (meal.calories || 0) * (meal.quantity || 1),
        protein: total.protein + (meal.protein || 0) * (meal.quantity || 1),
        fats: total.fats + (meal.fats || 0) * (meal.quantity || 1),
        carbs: total.carbs + (meal.carbs || 0) * (meal.quantity || 1),
        sugar: total.sugar + (meal.sugar || 0) * (meal.quantity || 1),
      };
    },
    { calories: 0, protein: 0, fats: 0, carbs: 0, sugar: 0 }
  );
  const remainingNutrition = {
    calories: totalCalories - totalMealNutrition.calories,
    protein: protein - totalMealNutrition.protein,
    fats: fats - totalMealNutrition.fats,
    carbs: carbs - totalMealNutrition.carbs,
    sugar: sugar - totalMealNutrition.sugar,
  };

  const handleEndEditing = () => {};

  const handleCarbsChange = (newCarbs) => {
    setCarbs(newCarbs);
  };

  const handleFatsChange = (newFats) => {
    setFats(newFats);
  };

  const handleSugarChange = (newSugar) => {
    setSugar(newSugar);
  };

  if (showAddMeal) {
    return (
      <AddMeal
        onBack={() => setShowAddMeal(false)}
        setSelectedMeal={setSelectedMeals}
      />
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#17181a" }}>
      <View style={styles.bannerAd}>
        <MyBannerAdComponent style={styles.bannerAd} />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <RecipesListLogic onFoodSelect={addFood} />
          <View style={styles.containerBackground}>
            <View style={styles.greyContainer}>
              <View style={styles.bigCircle}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Calories
                </Text>
                <TextInput
                  style={{ color: "white", fontWeight: "bold" }}
                  value={remainingNutrition.calories.toString()}
                  onChangeText={handleTotalCaloriesChange}
                  onEndEditing={handleEndEditing}
                  keyboardType="numeric"
                />
                <AnimatedCircularProgress
                  size={120}
                  width={15}
                  fill={
                    ((totalCalories - remainingNutrition.calories) /
                      totalCalories) *
                    100
                  }
                  tintColor="#17b178"
                  backgroundColor="black"
                  rotation={270}
                  arcSweepAngle={180}
                  lineCap="round"
                />
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <View style={styles.smallCircle}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Protein{" "}
                  </Text>
                  <TextInput
                    style={{ color: "white", fontWeight: "bold" }}
                    value={remainingNutrition.protein.toString()}
                    onChangeText={handleProteinChange}
                    keyboardType="numeric"
                  />
                  <AnimatedCircularProgress
                    size={70}
                    width={10}
                    fill={
                      ((protein - remainingNutrition.protein) / protein) * 100
                    }
                    tintColor="#17b178"
                    backgroundColor="black"
                    rotation={270}
                    arcSweepAngle={180}
                    lineCap="round"
                  />
                </View>
                <View style={styles.smallCircle}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Carbs{" "}
                  </Text>
                  <TextInput
                    style={{ color: "white", fontWeight: "bold" }}
                    value={remainingNutrition.carbs.toString()}
                    onChangeText={handleCarbsChange}
                    keyboardType="numeric"
                  />
                  <AnimatedCircularProgress
                    size={70}
                    width={10}
                    fill={((carbs - remainingNutrition.carbs) / carbs) * 100}
                    tintColor="#17b178"
                    backgroundColor="black"
                    rotation={270}
                    arcSweepAngle={180}
                    lineCap="round"
                  />
                </View>
                <View style={styles.smallCircle}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Fats{" "}
                  </Text>
                  <TextInput
                    style={{ color: "white", fontWeight: "bold" }}
                    value={remainingNutrition.fats.toString()}
                    onChangeText={handleFatsChange}
                    keyboardType="numeric"
                  />
                  <AnimatedCircularProgress
                    size={70}
                    width={10}
                    fill={((fats - remainingNutrition.fats) / fats) * 100}
                    tintColor="#17b178"
                    backgroundColor="black"
                    rotation={270}
                    arcSweepAngle={180}
                    lineCap="round"
                  />
                </View>
                <View style={styles.smallCircle}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Sugar{" "}
                  </Text>
                  <TextInput
                    style={{ color: "white", fontWeight: "bold" }}
                    value={remainingNutrition.sugar.toString()}
                    onChangeText={handleSugarChange}
                    keyboardType="numeric"
                  />
                  <AnimatedCircularProgress
                    size={70}
                    width={10}
                    fill={((sugar - remainingNutrition.sugar) / sugar) * 100}
                    tintColor="#17b178"
                    backgroundColor="black"
                    rotation={270}
                    arcSweepAngle={180}
                    lineCap="round"
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: "white" }} />
              <View>
                <Text
                  style={{ width: 50, textAlign: "center", color: "white" }}
                >
                  Meals
                </Text>
              </View>
              <View style={{ flex: 1, height: 1, backgroundColor: "white" }} />
            </View>
            <ScrollView>
              <FlatList
                style={{ height: 1000 }}
                data={selectedMeals}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Swipeable
                    renderRightActions={() => (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "red",
                          justifyContent: "center",
                          paddingHorizontal: 20,
                        }}
                        onPress={() => {
                          const newMeals = selectedMeals.filter(
                            (meal) => meal !== item
                          );
                          setSelectedMeals(newMeals);
                        }}
                      >
                        <Image
                          source={TrashCan}
                          style={{ width: 20, height: 20 }}
                        />
                      </TouchableOpacity>
                    )}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        console.log("Meal clicked");
                      }}
                    >
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
                          <TextInput
                            style={{ color: "white" }}
                            value={
                              item.quantity >= 0
                                ? item.quantity.toString()
                                : "1"
                            }
                            onChangeText={(text) => {
                              if (text === "") {
                                const newMeals = [...selectedMeals];
                                newMeals[index].quantity = 0; // Set quantity to 0 when input is empty
                                setSelectedMeals(newMeals);
                              } else {
                                const newQuantity = parseInt(text, 10);
                                if (
                                  !isNaN(newQuantity) &&
                                  newQuantity >= 0 &&
                                  newQuantity <= 25
                                ) {
                                  const newMeals = [...selectedMeals];
                                  newMeals[index].quantity = newQuantity;
                                  setSelectedMeals(newMeals);
                                }
                              }
                            }}
                            keyboardType="numeric"
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Swipeable>
                )}
              />
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 40,
          bottom: 60,
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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  greyContainer: {
    backgroundColor: "#232526",
    paddingTop: "2%", // adjust the value as needed
    paddingBottom: 0, // adjust the value as needed
    padding: "1%",
    marginLeft: "2%",
    marginRight: "2%",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 2, // adjust the value as needed
  },
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  smallCircle: {
    margin: "2%",
    marginBottom: "-3%",
  },
  bigCircle: {
    // marginBottom: -40,
    marginBottom: "-11%",
  },
  bannerAd: {
    width: 320,
    height: 50,
    alignSelf: "center", // Centers the ad horizontally
    marginTop: "2%", // Adjusts the space from the top
    marginBottom: "2%", // Adjusts the space from the bottom
  },
  containerBackground: {
    backgroundColor: "#17181a", // The new background color
  },
});

export default CalorieTrackerLogic;
