import { forwardRef } from 'react';
import { Group, Text, Grid } from '@mantine/core';
import PropTypes from 'prop-types';
import Folder from '@/icons/Folder';
import ChevronRight from '@/icons/ChevronRight';

export const CustomSelectItem = forwardRef(
  ({ label, isNew, ...others }, ref) => {
    return (
      <div ref={ref} {...others}>
        <Group
          noWrap
          position='apart'
          sx={{
            borderBottom: !isNew && '1px solid #E7E7E9',
            height: 44,
            padding: 0,
          }}
          pr={20}
        >
          <Text size='sm'># {label}</Text>
          {isNew && (
            <Text size='xs' color='dimmed'>
              New tag
            </Text>
          )}
        </Group>
      </div>
    );
  }
);

export const FileTreeItem = ({ text, recipe, selectedFoodHandler }) => {
  return (
    <Grid.Col
      span={1}
      sx={{
        height: 56,
        border: '2px solid #EDF3FC',
        borderRadius: 4,
        display: 'flex',
        padding: 18,
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={() => selectedFoodHandler(recipe, text)}
    >
      <Group>
        <Folder />
        <Text pt={4} color='#445670' weight='bold' size='sm'>
          {text}
        </Text>
        <Text pt={4} color='#445670' weight='bold' size='sm'>
          ({recipe.length})
        </Text>
      </Group>
      <ChevronRight color='#778CA3' strokeWidth={2} />
    </Grid.Col>
  );
};

CustomSelectItem.propTypes = {
  label: PropTypes.string.isRequired,
  isNew: PropTypes.bool.isRequired,
};

FileTreeItem.propTypes = {
  text: PropTypes.string.isRequired,
  recipe: PropTypes.arrayOf(
    PropTypes.exact({
      caloriesPerServing: PropTypes.number,
      id: PropTypes.number,
      name: PropTypes.string,
      serving: PropTypes.number,
    })
  ).isRequired,
  selectedFoodHandler: PropTypes.func.isRequired,
};
