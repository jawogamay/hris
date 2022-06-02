import CustomListItem from '@/components/molecules/CustomListItem';
import ArrowRightCircle from '@/icons/arrowRightCircle';
import { Text, Space, Paper, Avatar } from '@mantine/core';
import { useMemo } from 'react';

const MyCircleCard = () => {
  const list = useMemo(
    () => [
      {
        title: 'Triyandi Saputra',
        details: 'Last active 1 min ago',
        imgSrc:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
      },
      {
        title: 'James Coco',
        details: 'Last active 1 min ago',
        imgSrc:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
      },
      {
        title: 'John Doe',
        details: 'Last active 1 min ago',
        imgSrc:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
      },
      {
        title: 'Brandan G',
        details: 'Last active 1 min ago',
        imgSrc:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
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
        My Circle
      </Text>
      <Space h={12} />

      {list &&
        list.map((item, key) => (
          <CustomListItem
            key={key}
            index={key}
            {...item}
            divider='center'
            leftSection={<Avatar src={item.imgSrc} radius='xl' size={40} />}
            rightSection={<ArrowRightCircle />}
          />
        ))}
    </Paper>
  );
};

export default MyCircleCard;
