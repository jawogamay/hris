import Router from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import API from '@/api/BaseApi';
import moment from 'moment';
import PropTypes from 'prop-types';
import FullPageSpinner from '@/components/molecules/FullPageSpinner';
import { calculateNutritionPerServing } from '@/helpers/ingredientsHelper';
import {
  meal_value,
  meal_plan_value,
  tracker_plan_value,
} from '@/consts/select_choices';
import { showNotification } from '@mantine/notifications';

const Context = createContext();

export function RecipeImportCTX({ children }) {
  const savedRecipe = JSON.parse(localStorage.getItem('matchedRecipe'));
  const [recipe, setRecipe] = useState(savedRecipe);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [updating, setUpdating] = useState(0);

  if (!savedRecipe) {
    Router.push('/recipes/new/');
  }

  useEffect(() => {
    if (!savedRecipe) {
      Router.push('/recipes/new/');
    } else {
      setLoading(false);
    }
  }, [savedRecipe]);

  const handleSave = (data, trackChoice) => {
    setIsSaving(true)
    if (updating) {
      return showNotification({
        autoClose: 3000,
        color: 'red',
        message: 'Ingredient update still in-progress.',
      });
    }

    const formData = {
      ...recipe,
      nutritions: JSON.stringify(recipe.nutritions),
      directions: JSON.stringify(recipe.directions),
      // ingredients: JSON.stringify(recipe.ingredients),
      ingredients: JSON.stringify(recipe.ingrWithNutr.match),
      isTracker: tracker_plan_value.includes(trackChoice),
      isMealPlan: meal_plan_value.includes(trackChoice),
      plan: {
        date: moment(data.date).format('YYYY-MM-DD'),
        meal_type: meal_value[data.meal_type],
        serving: Number(data.serving),
      },
    };

    !formData.image && delete formData.image;
    !formData.url && delete formData.url;

    API.post('/recipes', formData)
      .then(({ data }) => {
        localStorage.removeItem('scrapedRecipe');
        localStorage.removeItem('matchedRecipe');
        Router.push(`/recipes?notification=${data}`);
      })
      .catch(({ response }) => {
        setError(response.data.message);
        showNotification({
          autoClose: 5000,
          color: 'red',
          message: response.data.message,
        });
        setIsSaving(false)
      });
  };

  const updateRecipeIngredients = (ingrs, index) => {
    // const newIngredients = [...recipe.ingredients];
    // newIngredients[index] = ingrs.match[0];

    const newIngrWithNutrMatch = [...recipe.ingrWithNutr.match];
    newIngrWithNutrMatch[index] = ingrs.match[0];

    // recipe.ingredients = newIngredients;
    recipe.ingrWithNutr.match = newIngrWithNutrMatch;

    setRecipe({
      ...recipe,
      nutritions: calculateNutritionPerServing(
        recipe.ingrWithNutr,
        recipe.serving
      ),
    });
  };

  const moveUnmatchToMatch = (ingrs, unmatchIdx) => {
    // recipe.ingredients = [...ingrs.match, ...recipe.ingredients || []];
    recipe.ingrWithNutr.match = [...ingrs.match, ...recipe.ingrWithNutr.match || []];
    recipe.ingrWithNutr.unmatch = recipe.ingrWithNutr.unmatch.filter((ingr, i) => i !== unmatchIdx)
    setRecipe({ ...recipe });
  };

  const deleteRecipeIngredients = (index, isMatch = true) => {
    // recipe.ingredients = recipe.ingredients.filter((ingr, i) => i !== index);
    if (isMatch) {
      recipe.ingrWithNutr.match = recipe.ingrWithNutr.match.filter(
        (ingr, i) => i !== index
      );
    } else {
      recipe.ingrWithNutr.unmatch = recipe.ingrWithNutr.unmatch.filter(
        (ingr, i) => i !== index
      );
    }

    setRecipe({ ...recipe });
  };

  useEffect(() => {
    localStorage.setItem('matchedRecipe', JSON.stringify(recipe))
  }, [recipe])

  useEffect(() => {
    // recalculate nutrition
    setRecipe({
      ...recipe,
      nutritions: calculateNutritionPerServing(
        recipe.ingrWithNutr,
        recipe.serving
      ),
    });
  }, [recipe.serving, recipe.ingrWithNutr.match])

  return loading ? (
    <FullPageSpinner />
  ) : (
    <Context.Provider
      value={{
        recipe,
        setRecipe,
        handleSave,
        updateRecipeIngredients,
        deleteRecipeIngredients,
        moveUnmatchToMatch,
        updating,
        setUpdating,
        isSaving,
        error,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useReipeImportCTX() {
  return useContext(Context);
}

RecipeImportCTX.propTypes = {
  children: PropTypes.node.isRequired,
};
