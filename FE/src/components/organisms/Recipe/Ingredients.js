import { useReipeDetailCTX } from '@/contexts/RecipeDetailContext';
import { Stack, Box, Title, Space, Spoiler, Group, Text } from '@mantine/core';
import BulletPoint from '@/icons/BulletPoint';

const Ingredients = () => {
  const data = useReipeDetailCTX();

  return (
    <Box>
      <Title order={3}>Ingredients</Title>
      <Space h={30} />
      <Spoiler
        maxHeight={185}
        showLabel='Show more'
        styles={() => ({
          control: {
            color: '#006C52',
            fontSize: 16,
            paddingTop: 20,
            fontWeight: 700,
          },
        })}
      >
        <Stack sx={{ gap: 15 }}>
          {Object.entries(JSON.parse(data.ingredients)).map((item, i) => (
            <BulletPoint key={i}>
              <Group spacing={5}>
                <Text color='#757575'>{`${item[1].amount ?? ''} ${item[1].unit ?? ''
                  }`}</Text>
                <Text weight='bold'>{item[1].ingr || item[1].name}</Text>
              </Group>
            </BulletPoint>
          ))}
        </Stack>
      </Spoiler>
      <Space h={60} />
    </Box>
  );
};

export default Ingredients;
