import React, { useRef } from 'react';
import { useReipeDetailCTX } from '@/contexts/RecipeDetailContext';
import { Box, Space, Group, Title, Spoiler, Text } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { spoiler } from './styles';

const Directions = () => {
  const data = useReipeDetailCTX();
  const [value, toggle] = useToggle(false, [false, true]);
  const showMoreRef = useRef(null);

  return (
    <Box>
      <Title order={3}>Directions</Title>
      <Space h={30} />
      <Spoiler
        controlRef={showMoreRef}
        initialState={value}
        maxHeight={180}
        showLabel='View full direction'
        onClick={(e) => {
          if (e.target === showMoreRef.current) {
            toggle();
          }
        }}
        styles={() => ({
          control: spoiler.control,
          content: !value && spoiler.content,
        })}
      >
        <Group>
          {data?.directions &&
            JSON.parse(data.directions).map((direction, i) => (
              <Box key={i}>
                <Title sx={{ color: '#006C52' }} pb={5} order={6}>
                  Step {i + 1}
                </Title>
                <Text>{direction}</Text>
              </Box>
            ))}
        </Group>
      </Spoiler>
      <Space h={50} />
    </Box>
  );
};

export default Directions;
