import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Funnel from '@/icons/Funnel';
import CustomMultiSelect from '@/components/molecules/CustomMultiSelect';
import MealPlanListItem from '@/components/organisms/MealPlan/MealPlanListItem';
import Drawer from '@/components/organisms/Drawer';
import { Box, Button, Center, Text, Grid, Loader } from '@mantine/core';
import useApi from '@/hooks/useApi';
import AddPreMadeMealPlan from '@/components/organisms/MealPlan/AddPreMadeMealPlan';

const Index = () => {
  const router = useRouter();
  const { sort } = router.query;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isPreMadeOpen, setIsPreMadeOpen] = useState(false);
  const [mealPlans, setMealPlans] = useState([
    [
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
    ],
    [
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
    ],
    [
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
    ],
    [
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
    ],
    [
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
      [
        {
          breakfast: null,
        },
        {
          snack: null,
        },
        {
          lunch: null,
        },
        {
          snack: null,
        },
        {
          dinner: null,
        },
      ],
    ],
  ]);
  const [week, setWeek] = useState(0);
  const [droppedData, setDroppedData] = useState(null);

  const [meal_data, fetching] = useApi(
    {
      method: 'GET',
      url: '/my-meal-plan',
      params: {
        sort,
      },
    },
    router.query
  );

  const handleSort = (e) => {
    const sort = e.target.value;
    router.query.sort = sort;
    router.push(router);
  };

  const data = [
    { group: 'Recent', value: 'Breakfast', label: 'Breakfast', count: 12 },
    { group: 'Recent', value: 'Vegetable', label: 'Vegetable', count: 14 },
    { group: 'Recent', value: 'Health Food', label: 'Health Food', count: 23 },
    { group: 'Recent', value: 'Diet Food', label: 'Diet Food', count: 32 },
    { group: 'Recent', value: 'ZeroSugar', label: 'ZeroSugar', count: 3 },
  ];

  const fileTreeItems = [
    {
      text: 'All',
      recipe: [
        {
          id: 1,
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
      ],
    },
    {
      text: 'Dinner',
      recipe: [
        {
          id: 2,
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Chargrilled Mackerel With Sweet And Sour Beetroot',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
      ],
    },
    {
      text: 'Breakfast',
      recipe: [
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
      ],
    },
    {
      text: 'Low Calories',
      recipe: [
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
      ],
    },
    {
      text: 'Vegetables',
      recipe: [
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
      ],
    },
    {
      text: 'Carbo',
      recipe: [
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
        {
          name: 'Foil Pack Cajun',
          caloriesPerServing: 93,
          serving: 3,
        },
      ],
    },
  ];

  const meals = ['Breakfast', 'Snack', 'Lunch', 'Snack', 'Dinner'];

  useEffect(() => {
    if (week <= 0) {
      return setWeek(0);
    }
    if (week >= 4) {
      return setWeek(4);
    }
  }, [week]);

  const addRecipeToBoard = (item) => {
    setDroppedData(item);
  };

  useEffect(() => {
    if (droppedData) {
      const meal = droppedData?.item.recipe;
      let weekMealPlan = mealPlans[week];

      weekMealPlan[droppedData?.target.xIndex][droppedData?.target.yIndex][
        meals[droppedData?.target.yIndex].toLowerCase()
      ] = meal;
      setDroppedData(null);
    }
  }, [droppedData, week]);

  const weekHandler = (num) => {
    if ((week === 0 && num === -1) || (week === 4 && num === 1)) {
      return;
    }
    setWeek((v) => (v += num));
  };

  return (
    <Box>
      <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <AddPreMadeMealPlan
        isPreMadeOpen={isPreMadeOpen}
        setIsPreMadeOpen={setIsPreMadeOpen}
        tags={data}
        fileTreeItems={fileTreeItems}
        mealPlans={mealPlans[week]}
        week={week}
        setWeek={setWeek}
        addRecipeToBoard={addRecipeToBoard}
        meals={meals}
        weekHandler={weekHandler}
      />
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button size='md' onClick={() => setIsPreMadeOpen(true)}>
          Add Pre-made Meal Plan
        </Button>
      </Box>
      <Center py={26} sx={{ justifyContent: 'space-between' }}>
        <CustomMultiSelect data={data} />
        <Center>
          <Text color='#0B2C2A' size='md' mr='xs'>
            Sort by:
          </Text>
          {router.isReady && (
            <select
              defaultValue={sort || ''}
              onChange={handleSort}
              style={{
                border: 'none',
                minWidth: 70,
                outline: 'none',
                cursor: 'pointer',
                lineHeight: 1.2,
                fontSize: 16,
              }}
            >
              <option value='oldest'>Oldest</option>
              <option value='newest'>Newest</option>
              <option value='title'>Title</option>
            </select>
          )}
          <Box
            onClick={() => setOpenDrawer(true)}
            sx={{
              background: '#EFF2F4',
              padding: '13px 15px',
              borderRadius: '8px',
              marginLeft: '30px',
              cursor: 'pointer',
            }}
          >
            <Funnel />
          </Box>
        </Center>
      </Center>

      <Grid>
        {fetching ? (
          <Center style={{ height: '50vh', width: '100%' }}>
            <Loader />
          </Center>
        ) : (
          <>
            {meal_data.map((plan, key) => (
              <Grid.Col key={key} span={3}>
                <MealPlanListItem
                  title={plan.title}
                  total_recipes={plan.recipe_plans_count}
                  total_days='30'
                />
              </Grid.Col>
            ))}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Index;
