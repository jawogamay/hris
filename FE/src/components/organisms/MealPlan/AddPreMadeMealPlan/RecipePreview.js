import { memo } from 'react';
import { Group, Card, Text, Image, Stack, Badge, Box } from '@mantine/core';
import FileText from '@/icons/FileText';
import PropTypes from 'prop-types';

export const RecipePreview = memo(({ recipe }) => {
  return (
    <Card
      shadow='lg'
      p='xs'
      radius={0}
      ml={2.5}
      styles={() => ({
        root: {
          width: '10vw',
          height: '17.5vh',
          borderTop: '3px solid #006C52',
        },
      })}
    >
      <Stack sx={{ height: '100%' }} justify='space-between'>
        <Stack spacing={0}>
          <Group spacing={8}>
            <Image
              width='3vw'
              height='6vh'
              fit='cover'
              radius='xs'
              src='https://s3-alpha-sig.figma.com/img/7e96/bb15/a03cd1a042d3d50dec9547f915929cc9?Expires=1654473600&Signature=ETmD13YBp9QCkpYL~YWy1CnkR~8FVsx-ZE1eq6sG7kEcLZqgsF1m8YfI9j4HjeIcVRiKObfLXgTkZW1A96Cf4eXJHw3zNDItqpDr3roTWRLFKxL7Q7GwIxtSKguCGPXO1kTrG89eSlXyIMbg0K2sRt-Vt4nr5wb1VzLX7r3mLRSeApe5wscGdaR7CHugT260mbaTTFpsK32mDtAk~CfIV41znObJg5I1ut0QbNknWaEIaThoNJs1e8VCWZ7qd1MtP4D-u3CQCAFWZWIhNnX5KDGTUNL-9atTvo3wNvGEl2REtgWKvQyfOyHGxrTtUfNlce99y7YhYkVnng~cYAlTxw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'
              alt='Random unsplash image'
            />
            <Text
              lineClamp={2}
              sx={{ flex: 1 }}
              color='#101E51'
              size='xs'
              weight='bold'
            >
              {recipe.name}
            </Text>
          </Group>
          <Group mx='auto'>
            <Badge
              styles={() => ({
                root: {
                  backgroundColor: '#EFF2F4',
                  color: '#65768E',
                  width: 'max-content',
                  height: 20,
                  textTransform: 'capitalize',
                },
              })}
              radius='xs'
              px={5}
              ml={10}
            >
              Recipe
            </Badge>
          </Group>
        </Stack>
        <Box>
          <Text color='#828282' sx={{ fontSize: 10 }}>
            Calories per serving
          </Text>
          <Group position='apart'>
            <Text color='#101E51' size='xs' weight='bold'>
              {recipe.caloriesPerServing}cal
            </Text>
            <FileText />
          </Group>
        </Box>
      </Stack>
    </Card>
  );
});

RecipePreview.propTypes = {
  recipe: PropTypes.object.isRequired,
};
