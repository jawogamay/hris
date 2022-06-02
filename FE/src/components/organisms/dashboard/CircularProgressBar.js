import { Paper, Text, Group, Center, Box } from '@mantine/core';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const CircularProgressBar = ({ limit, progress }) => {
  const data = {
    labels: ['Progress', 'Left'],
    datasets: [
      {
        data: [limit, progress],
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return;
          }
          return [getGradient(ctx, chartArea), '#DEE1E6'];
        },
        borderWidth: 0,
      },
    ],
  };

  const remainingCal = () => limit - progress;

  let gradient;
  function getGradient(ctx) {
    if (!gradient) {
      gradient = ctx.createLinearGradient(0, 150, 0, 0);
      gradient.addColorStop(0, '#B2DD91');
      gradient.addColorStop(1, '#006C52');
    }

    return gradient;
  }

  const options = {
    cutout: 50,
    responsive: false,
    maintainAspectRatio: false,
    aspectRatio: 5,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <Paper
      radius='lg'
      p='21px 24px 23px 24px'
      shadow='0px 40px 80px #EEF1F4'
      style={{
        border: '1px sold #ECEFF4',
        height: '370px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Text weight='bold' size='xl'>
        Progress
      </Text>
      <Center>
        <Doughnut data={data} options={options} />
        <Box
          sx={{
            position: 'absolute',
            background: '#006C52',
            height: 75,
            width: 75,
            borderRadius: 9999,
          }}
        >
          <Center sx={{ height: '100%' }}>
            <Box>
              <Text
                weight='bold'
                size='sm'
                color='white'
                sx={{ lineHeight: 1 }}
              >
                {remainingCal()} cal
              </Text>
              <Text sx={{ fontSize: 11, textAlign: 'center' }} color='white'>
                remain
              </Text>
            </Box>
          </Center>
        </Box>
      </Center>
      <Group style={{ fontSize: 12 }}>
        <Box
          py={4}
          pl={8}
          pr={12}
          style={{
            border: '1px solid #ECECF0',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            mr={6}
            style={{ width: 8, height: 8, background: 'gray', borderRadius: 3 }}
            color='gray'
          />
          Aim
        </Box>
        <Box
          py={4}
          pl={8}
          pr={12}
          style={{
            border: '1px solid #ECECF0',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            mr={6}
            style={{
              width: 8,
              height: 8,
              background:
                'linear-gradient(199.78deg, #006C52 12.43%, #B2DD91 80.22%)',
              borderRadius: 3,
            }}
            color='gray'
          />
          Consumed
        </Box>
      </Group>
    </Paper>
  );
};

CircularProgressBar.propTypes = {
  limit: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
};

CircularProgressBar.defaultProps = {
  limit: 1000,
  progress: 600,
};

export default CircularProgressBar;
