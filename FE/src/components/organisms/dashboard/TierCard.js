import PropTypes from 'prop-types';
import { Text, Space, Paper, Box, Center } from '@mantine/core';
import SpoonForkCrossed from '@/icons/spoonForkCrossed';

const TierCard = ({ iconColor, tier, count }) => {
  return (
    <Paper
      radius='lg'
      p='21px 24px 23px 24px'
      shadow='0px 40px 80px #EEF1F4'
      style={{ border: '1px sold #ECEFF4' }}
    >
      <Center inline>
        <SpoonForkCrossed bgColor={iconColor} />
        <Space w='sm' />
        <Text weight={500} size='lg' style={{ color: '#7A8394' }}>
          {tier}
        </Text>
      </Center>
      <Space h={31} />
      <Box style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Text weight='bold' color='green-theme' style={{ fontSize: 42 }}>
          {count}
        </Text>
        <Text
          pl={8}
          pb={12}
          weight={500}
          size='lg'
          style={{ color: '#7A8394' }}
        >
          Food Eaten
        </Text>
      </Box>
    </Paper>
  );
};

export default TierCard;

TierCard.propTypes = {
  iconColor: PropTypes.string,
  tier: PropTypes.string.isRequired,
  count: PropTypes.string,
};

TierCard.defaultProps = {
  iconColor: '#006C52',
  count: '0',
};
