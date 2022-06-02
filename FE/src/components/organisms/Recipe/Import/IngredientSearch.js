import { useState } from 'react';
import { useReipeImportCTX } from '@/contexts/RecipeImportContext';
import PropTypes from 'prop-types';
import API from '@/api/BaseApi';
import { parseIngredients } from '@/helpers/ingredientsHelper';
import CircleWithNumber from '@/icons/CircleWithNumber';
import Trash from '@/icons/Trash';
import { useHover } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  Group,
  Text,
  Box,
  TextInput,
  Loader,
  Button,
} from '@mantine/core';

const IngredientSearch = ({ ingredient, index }) => {
  const { moveUnmatchToMatch, deleteRecipeIngredients } = useReipeImportCTX();
  const { hovered, ref } = useHover();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      ingredient: '',
    },

    validate: {
      ingredient: (value) => (!value ? 'Required' : null),
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
          form.setErrors({ ingredient: 'Unable to find ingredient' });
          return setLoading(false);
        }

        form.reset();
        moveUnmatchToMatch(ingredients, index)
        setLoading(false);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const searchRecipe = (values) => {
    setLoading(true);

    API.request({
      method: 'GET',
      url: `/scraper/match-ingredient`,
      params: {
        ingrs: [values.ingredient],
      },
    }).then(({ data }) => {
      fetchScrapedRecipe(data.id);
    });
  };

  return (
    <form onSubmit={form.onSubmit(searchRecipe)}>
      <Group ref={ref} py={11} sx={{
        borderBottom: '1px solid #E6E6E6',
        display: 'flex',
        alignItems: 'flex-start'
      }}>
        <CircleWithNumber text='?' color='#C8362E' />
        <Box sx={{ width: 142 }}>
          <Text
            color='#1C212D'
            size='sm'
            sx={{ maxWidth: 142, fontWeight: 'bold' }}
          >
            {ingredient.ingr}
          </Text>
        </Box>
        <TextInput sx={{ flex: 1 }} {...form.getInputProps('ingredient')} disabled={loading} />
        <Group sx={{ minWidth: 185 }}>
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 35 }}>
              <Loader size='xs' />
            </Box>
          ) : (
            <>
              <Group sx={{ cursor: 'pointer' }}>
                <Button type='submit'>Search</Button>
              </Group>
              <Group sx={{ cursor: 'pointer', width: 85 }}>
                {hovered && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={() => deleteRecipeIngredients(index, false)}>
                    <Trash />
                    <Text size='sm' color='#C8362E' pt={5}>
                      Delete
                    </Text>
                  </Box>
                )}
              </Group>
            </>
          )}
        </Group>
      </Group>
    </form>
  );
};

IngredientSearch.propTypes = {
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  ingredient: PropTypes.object.isRequired,
};

export default IngredientSearch;
