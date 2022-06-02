import { useState } from 'react';
import { useReipeImportCTX } from '@/contexts/RecipeImportContext';
import PropTypes from 'prop-types';
import API from '@/api/BaseApi';
import { parseIngredients } from '@/helpers/ingredientsHelper';
import CircleWithNumber from '@/icons/CircleWithNumber';
import Edit from '@/icons/Edit';
import CheckSquare from '@/icons/CheckSquare';
import CloseSquare from '@/icons/CloseSquare';
import Chevrondown from '@/icons/Chevrondown';
import Trash from '@/icons/Trash';
import {
  ingredient_measurements,
  ingredient_measurements_data,
} from '@/consts/select_choices';
import { useHover } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { Group, Text, Box, Input, Grid, Select, Loader } from '@mantine/core';

const IngredientEdit = ({ order, ingredient, isLast }) => {
  const {
    updateRecipeIngredients,
    deleteRecipeIngredients,
    updating,
    setUpdating,
  } = useReipeImportCTX();
  const { hovered, ref } = useHover();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [hasValidationError, setHasValidationError] = useState(false);

  const nutritions = {
    calories: ingredient.calories,
    fat: ingredient.fat,
    carbs: ingredient.carbs,
    sodium: ingredient.sodium,
    cholesterol: ingredient.cholesterol,
  };

  const parseUnit = (unit) => {
    const measurement = Object.entries(ingredient_measurements_data).filter(
      ([key, value]) => {
        if (value.includes(unit.toLowerCase())) {
          return key;
        }
      }
    );

    return measurement.length ? measurement[0][0] : unit;
  };

  const form = useForm({
    initialValues: {
      amount: ingredient.itemized.quantity,
      unit: ingredient.itemized.unit ? parseUnit(ingredient.itemized.unit) : '',
    },

    validate: {
      amount: (value) => (value === '' ? 'Amount Required' : null),
    },
  });

  const fetchScrapedRecipe = (id) => {
    API.request({
      method: 'GET',
      url: `/scraper/show/${id}`,
    })
      .then(({ data }) => {
        if (!data.is_job_done) {
          return setTimeout(() => {
            return fetchScrapedRecipe(id);
          }, 2000);
        }
        const ingredients = parseIngredients(JSON.parse(data.nutritions));

        if (data.error || ingredients.unmatch?.length) {
          showNotification({
            color: 'red',
            message: 'Something went wrong.',
          });
          return setLoading(false);
        }

        updateRecipeIngredients(ingredients, order - 1);
        setUpdating(updating - 1);
        return setLoading(false);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const editSubmit = () => {
    const validated = form.validate();
    if (validated.hasErrors) {
      return setHasValidationError(true);
    }
    setUpdating(updating + 1);
    setLoading(true);
    setEditing(false);
    setHasValidationError(false);
    const values = form.values;
    const combinedIngr =
      values.amount + ' ' + values.unit + ' ' + ingredient.itemized.ingredient;

    API.request({
      method: 'GET',
      url: `/scraper/match-ingredient`,
      params: {
        ingrs: [combinedIngr],
      },
    }).then(({ data }) => {
      fetchScrapedRecipe(data.id);
    });
  };

  return (
    <Group
      ref={ref}
      py={11}
      sx={{ borderBottom: !isLast && '1px solid #E6E6E6' }}
    >
      <CircleWithNumber text={order} />
      <Box sx={{ width: 142 }}>
        <Text
          color='#1C212D'
          size='sm'
          sx={{ maxWidth: 142, fontWeight: 'bold' }}
        >
          {editing ? ingredient.itemized.ingredient : ingredient.ingr}
        </Text>

        {editing && (
          <form onSubmit={form.onSubmit(editSubmit)}>
            <Grid gutter='lg'>
              <Grid.Col span={4}>
                <Box
                  sx={{
                    borderBottom: '1px solid ',
                    borderColor: hasValidationError ? 'red' : '#8C97A1',
                  }}
                >
                  <Input
                    type='number'
                    variant='unstyled'
                    sx={{
                      height: 30,
                      minHeight: 30,
                      lineHeight: 30,
                    }}
                    styles={{
                      input: { textAlign: 'center' },
                    }}
                    {...form.getInputProps('amount')}
                  />
                </Box>
              </Grid.Col>
              <Grid.Col span={8}>
                <Box sx={{ borderBottom: '1px solid #8C97A1', padding: 0 }}>
                  <Select
                    rightSection={<Chevrondown />}
                    variant='unstyled'
                    sx={{
                      height: 30,
                      minHeight: 30,
                      lineHeight: 30,
                    }}
                    data={
                      !ingredient.itemized.unit ||
                      ingredient_measurements.includes(ingredient.itemized.unit)
                        ? ingredient_measurements
                        : [...ingredient_measurements, ingredient.itemized.unit]
                    }
                    {...form.getInputProps('unit')}
                  />
                </Box>
              </Grid.Col>
            </Grid>
          </form>
        )}
      </Box>
      <Group spacing={45}>
        <Group spacing={27} sx={{ paddingLeft: 10 }}>
          {Object.entries(nutritions).map(([key, value]) => (
            <CircleWithNumber
              key={key}
              color='#B2DD91'
              width={42}
              height={42}
              text={parseInt(value)}
              c={21}
              r={19.5}
              fontSize={12}
            />
          ))}
        </Group>
        {loading ? (
          <Loader size='xs' />
        ) : editing ? (
          <Group spacing={10}>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => setEditing(false)}
            >
              <CloseSquare />
            </div>
            <div style={{ cursor: 'pointer' }} onClick={editSubmit}>
              <CheckSquare />
            </div>
          </Group>
        ) : (
          <Group spacing={30}>
            {hovered && (
              <>
                <Group
                  spacing={7}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setEditing(true)}
                >
                  <Edit />
                  <Text size='sm' pt={5}>
                    Edit
                  </Text>
                </Group>
                <Group
                  spacing={7}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => deleteRecipeIngredients(order - 1)}
                >
                  <Trash />
                  <Text size='sm' color='#C8362E' pt={5}>
                    Delete
                  </Text>
                </Group>
              </>
            )}
          </Group>
        )}
      </Group>
    </Group>
  );
};

IngredientEdit.propTypes = {
  order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  ingredient: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
};

export default IngredientEdit;
