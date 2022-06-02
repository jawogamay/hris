import parse from 'parse-ingredients';

export const parseIngredients = (data) => {
  const parsed = Object.entries(data).map(([key, value]) => {
    return {
      [key]: value.map((ingredient) => {
        const itemized = parse(ingredient.ingr);
        return {
          ...ingredient,
          itemized,
        };
      }),
    };
  });

  const matchIngrs = parsed.filter((data) => Object.keys(data)[0] === 'match');
  const unMatchIngrs = parsed.filter(
    (data) => Object.keys(data)[0] === 'unmatch'
  );

  return {
    match: matchIngrs.length ? matchIngrs[0].match : null,
    unmatch: unMatchIngrs.length ? unMatchIngrs[0].unmatch : null,
  };
};

export const calculateNutritionPerServing = (nutritions, serving) => {
  let totalNutrition = {
    calories: 0,
    fat: 0,
    carbs: 0,
    cholesterol: 0,
    sodium: 0,
  };

  nutritions.match?.forEach((ingredients) => {
    totalNutrition = {
      calories: totalNutrition.calories + ingredients.calories,
      fat: totalNutrition.fat + ingredients.fat,
      carbs: totalNutrition.carbs + ingredients.carbs,
      cholesterol: totalNutrition.cholesterol + ingredients.cholesterol,
      sodium: totalNutrition.sodium + ingredients.sodium,
    };
  });

  const nutritionsPerServing = {
    calories: totalNutrition.calories / serving,
    fat: totalNutrition.fat / serving,
    carbs: totalNutrition.carbs / serving,
    cholesterol: totalNutrition.cholesterol / serving,
    sodium: totalNutrition.sodium / serving,
  };
  return nutritionsPerServing;
};
