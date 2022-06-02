import PropTypes from 'prop-types';
import { Box, Space, Center } from '@mantine/core';
import Logo from '@/icons/Logo';
import MFP from '@/icons/MFP';

const Index = ({ logoColor, mfpColor }) => {
  return (
    <Box px={40} py={37} style={{ display: 'flex' }}>
      <Center>
        <Logo color={logoColor} />
        <Space w={8} />
        <MFP color={mfpColor} />
      </Center>
    </Box>
  );
};

export default Index;

Index.propTypes = {
  logoColor: PropTypes.string,
  mfpColor: PropTypes.string,
};

Index.defaultProps = {
  logoColor: '#006C53',
  mfpColor: 'black',
};
