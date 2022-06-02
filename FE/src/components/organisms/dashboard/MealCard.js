import { Text, Space, Paper } from '@mantine/core';
import { useMemo } from 'react';
import CustomListItem from '@/components/molecules/CustomListItem';
import BreadCircle from '@/icons/breadCircle';
import PizzaCircle from '@/icons/pizzaCircle';
import DinnerCircle from '@/icons/dinnerCircle';

const MealCard = () => {
  const iconType = (type) => {
    switch (type) {
      case 'bread':
        return <BreadCircle />;
      case 'pizza':
        return <PizzaCircle />;
      case 'dinner':
        return <DinnerCircle />;
      default:
        return <BreadCircle />;
    }
  };

  const list = useMemo(
    () => [
      {
        title: 'Bread with chocolate',
        details: 'Bread',
        type: 'bread',
      },
      {
        title: 'Fried chicken spicy',
        details: 'Vegetables',
        type: 'bread',
      },
      {
        title: 'Brocolly with cabai',
        details: 'Fruits',
        type: 'pizza',
      },
      {
        title: 'Bread with chocolate',
        details: 'Bread',
        type: 'dinner',
      },
    ],
    []
  );

  return (
    <Paper
      radius='lg'
      p='21px 0 23px 24px'
      shadow='0px 40px 80px #EEF1F4'
      style={{ border: '1px sold #ECEFF4' }}
    >
      <Text weight='bold' size='xl'>
        Meal For Today
      </Text>
      <Space h={12} />

      {list &&
        list.map((item, key) => (
          <CustomListItem
            key={key}
            index={key}
            {...item}
            divider='center'
            leftSection={iconType(item.type)}
            rightSection={
              <Text weight='bold' color='green-theme'>
                Swap
              </Text>
            }
          />
        ))}
    </Paper>
  );
};

export default MealCard;
