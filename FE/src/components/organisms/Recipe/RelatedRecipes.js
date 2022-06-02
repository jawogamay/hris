import { Box, Space, Group, Title, SimpleGrid } from '@mantine/core';
import RelatedRecipe from '@/components/molecules/Recipe/RelatedRecipe';
import { useRecipeRelatedCTX } from '@/contexts/RecipeRelatedContext';

const RelatedRecipes = () => {
  const relatedRecipes = useRecipeRelatedCTX()
  return (
    <Box>
      <Title order={3}>Related Recipes</Title>
      <Space h={30} />
      <SimpleGrid cols={4} spacing={30}>
        {
          relatedRecipes &&
          relatedRecipes.map((item, i) => <RelatedRecipe key={i} image={item.image} title={item.title} serving={item.serving} id={item.id} />)
        }
      </SimpleGrid>
      <Space h={60} />
    </Box>
  );
};

export default RelatedRecipes;
