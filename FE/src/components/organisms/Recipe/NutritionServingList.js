import { useReipeDetailCTX } from '@/contexts/RecipeDetailContext';
import { Box, Space, Group, Title, Center, Text } from '@mantine/core';

const NutritionServingList = () => {
  const data = useReipeDetailCTX();
  const nutritions = JSON.parse(data.nutritions);
  const unit = {
    calories: 'kcal',
    fat: 'g',
    carbs: 'g',
    sodium: 'mg',
    cholesterol: 'mg',
  };

  return (
    <Box>
      <Title order={3}>Nutrition per serving</Title>
      <Space h={20} />
      <Group>
        {data &&
          Object.entries(nutritions).map(([key, value]) => {
            return (
              <Center
                key={key}
                sx={{
                  background: '#F3F6F9',
                  borderRadius: 4,
                  padding: '13px 27px',
                  minWidth: 90,
                }}
              >
                <Box>
                  <Text weight='bold' color='#006C52' size='sm' align='center'>
                    {parseInt(value)} {unit[key]}
                  </Text>
                  <Text
                    color='#78A99D'
                    size='xs'
                    align='center'
                    transform='capitalize'
                  >
                    {key}
                  </Text>
                </Box>
              </Center>
            );
          })}
      </Group>
      <Space h={60} />
    </Box>
  );
};

export default NutritionServingList;
