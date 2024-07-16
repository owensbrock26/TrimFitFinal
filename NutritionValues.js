import AsyncStorage from '@react-native-async-storage/async-storage';

export const originalNutrition = {
  calories: 2000,
  protein: 0.25, // percentage of total calories
  fats: 0.3, // percentage of total calories
  carbs: 0.45, // percentage of total calories
  sugar: 0.1, // percentage of total calories
};

export function calculateNutrition(totalCalories) {
  return {
    protein: totalCalories * originalNutrition.protein,
    fats: totalCalories * originalNutrition.fats,
    carbs: totalCalories * originalNutrition.carbs,
    sugar: totalCalories * originalNutrition.sugar,
  };
}

export async function saveNutritionValues(nutritionValues, totalCalories) {
  try {
    const jsonValues = JSON.stringify(nutritionValues);
    await AsyncStorage.setItem('@nutrition_values', jsonValues);
    await AsyncStorage.setItem('@total_calories', totalCalories.toString());
  } catch (e) {
    // saving error
    console.error(e);
  }
}

export async function loadNutritionValues() {
  try {
    const jsonValues = await AsyncStorage.getItem('@nutrition_values');
    const totalCalories = await AsyncStorage.getItem('@total_calories');
    return {
      nutritionValues: jsonValues != null ? JSON.parse(jsonValues) : null,
      totalCalories: totalCalories != null ? parseInt(totalCalories, 10) : null,
    };
  } catch(e) {
    // loading error
    console.error(e);
  }
}
