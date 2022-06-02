import { memo, useEffect } from 'react';
import { Stack, Group, Image, Text, Divider } from '@mantine/core';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

export const DraggableRecipe = memo(({ recipe }) => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'div',
      item: { recipe },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [recipe]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <Stack ref={drag} spacing={16} role='DraggableRecipe'>
      <Group>
        <Image
          width='3vw'
          height='6vh'
          fit='cover'
          radius='xs'
          src='https://s3-alpha-sig.figma.com/img/7e96/bb15/a03cd1a042d3d50dec9547f915929cc9?Expires=1654473600&Signature=ETmD13YBp9QCkpYL~YWy1CnkR~8FVsx-ZE1eq6sG7kEcLZqgsF1m8YfI9j4HjeIcVRiKObfLXgTkZW1A96Cf4eXJHw3zNDItqpDr3roTWRLFKxL7Q7GwIxtSKguCGPXO1kTrG89eSlXyIMbg0K2sRt-Vt4nr5wb1VzLX7r3mLRSeApe5wscGdaR7CHugT260mbaTTFpsK32mDtAk~CfIV41znObJg5I1ut0QbNknWaEIaThoNJs1e8VCWZ7qd1MtP4D-u3CQCAFWZWIhNnX5KDGTUNL-9atTvo3wNvGEl2REtgWKvQyfOyHGxrTtUfNlce99y7YhYkVnng~cYAlTxw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'
          alt='Random unsplash image'
        />
        <Stack align='start' spacing={0} mt={6} sx={{ flex: 1 }}>
          <Text lineClamp={1} color='#101E51' size='sm' weight='bold'>
            {recipe.name}
          </Text>
          <Group spacing={10}>
            <Group spacing={6}>
              <Text weight='bold' color='#000000' size='xs'>
                {recipe.caloriesPerServing}
              </Text>
              <Text color='#000000' size='xs'>
                calories per serving
              </Text>
            </Group>
            <Group spacing={6}>
              <Text weight='bold' color='#000000' size='xs'>
                {recipe.serving}
              </Text>
              <Text color='#000000' size='xs'>
                serving
              </Text>
            </Group>
          </Group>
        </Stack>
      </Group>
      <Divider />
    </Stack>
  );
});

DraggableRecipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};
