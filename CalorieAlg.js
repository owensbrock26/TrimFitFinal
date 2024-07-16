const calculateNutrition = (totalCalories) => {
    const protein = Math.round(totalCalories * 0.07); // 0.7% of total calories
    const carbs = Math.round(totalCalories / 7.27272727);
    const fats = Math.round(totalCalories / 23.5294118);
    const sugar = Math.round(totalCalories / 40);
  
    return { totalCalories, protein, carbs, fats, sugar };
  };
  
  export default calculateNutrition;