import { useReipeImportCTX } from '@/contexts/RecipeImportContext';
import { Box, Space, Title, Group, Text } from '@mantine/core';
import Ingredient from '@/components/organisms/Recipe/Import/Ingredient';
import IngredientSearch from '@/components/organisms/Recipe/Import/IngredientSearch';

const Ingredients = () => {
  const { recipe } = useReipeImportCTX();

  return (
    <Box>
      <Space h={60} />
      <Box spacing={32} sx={{ height: 146 }}>
        <Group spacing={27} my={20} mt={14} mb={10}>
          <Title order={3} sx={{ minWidth: 185 }}>
            {(recipe.ingrWithNutr?.match?.length ?? 0) + (recipe.ingrWithNutr?.unmatch?.length ?? 0)} Ingredients
          </Title>
          <Group spacing={0}>
            <Text size='xs' color='#757575'>
              Calories
            </Text>
            <Text size='xs' color='#757575' sx={{ paddingLeft: 35 }}>
              Fat
            </Text>
            <Text size='xs' color='#757575' sx={{ paddingLeft: 40 }}>
              Carbs
            </Text>
            <Text size='xs' color='#757575' sx={{ paddingLeft: 28 }}>
              Sodium
            </Text>
            <Text size='xs' color='#757575' sx={{ paddingLeft: 12 }}>
              Cholesterol
            </Text>
          </Group>
        </Group>
        <Box pb={150}>
          {recipe.ingrWithNutr?.unmatch?.map((item, i) => (
            <IngredientSearch
              key={i}
              index={i}
              ingredient={item}
            />
          ))}
          {recipe.ingrWithNutr?.match?.map((item, i) => (
            <Ingredient
              key={i}
              order={i + 1}
              ingredient={item}
              isLast={i === recipe.ingrWithNutr.match.length - 1}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Ingredients;
