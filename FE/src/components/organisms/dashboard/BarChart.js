import { Text, Paper, Center } from '@mantine/core';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChart = () => {
  const data = {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    datasets: [
      {
        label: '%',
        data: [30, 60, 30, 90, 80, 20, 40],
        backgroundColor: '#B0DC90',
        borderRadius: 24,
        barThickness: 12,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    offset: true,
    scales: {
      y: {
        ticks: {
          color: '#8AB8AD',
          stepSize: 20,
          padding: 10,
        },
        grid: {
          color: '#2D937A',
          borderDash: [1, 5],
          backgroundColor: 'white',
          borderColor: '#006C52',
          drawBorder: false,
          drawTicks: false,
        },
        suggestedMax: 100,
      },
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderColor: 'rgba(255, 255, 255, 0.5)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      titles: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <Paper
      radius='lg'
      p='21px 47px 23px 28px'
      shadow='0px 40px 80px #EEF1F4'
      style={{ border: '1px sold #ECEFF4', background: '#006C52', height: 360 }}
    >
      <Text weight='bold' size='xl' color='white' pl={9}>
        Water Tracker
      </Text>
      <Center pt={22} style={{ height: '90%' }}>
        <Bar data={data} options={options} />
      </Center>
    </Paper>
  );
};

export default BarChart;
