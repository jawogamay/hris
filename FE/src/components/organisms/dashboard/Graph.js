import { Paper, Text } from '@mantine/core';

const Graph = () => {
  return (
    <Paper
      radius='lg'
      p='21px 24px 23px 24px'
      shadow='0px 40px 80px #EEF1F4'
      style={{ border: '1px sold #ECEFF4', height: '370px' }}
    >
      <Text weight='bold' size='xl'>
        Calorie History
      </Text>
    </Paper>
  );
};

export default Graph;
