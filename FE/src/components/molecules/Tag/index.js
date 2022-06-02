import { Box, Text } from '@mantine/core';
import PropTypes from 'prop-types';

const Index = ({ label }) => {
  return (
    <Box
      p={8}
      mr={8}
      sx={{
        background: '#F3F6F9',
        borderRadius: 6,
        display: 'inline-block',
      }}
    >
      <Text color='green-theme'>{label}</Text>
    </Box>
  );
};

export default Index;

Index.propTypes = {
  label: PropTypes.string.isRequired,
};
