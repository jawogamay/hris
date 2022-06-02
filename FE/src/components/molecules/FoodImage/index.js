import PropTypes from 'prop-types';
import { Image } from '@mantine/core';

const Index = ({ width, src }) => {
  return (
    <Image 
      radius='md'
      src={src} 
      width={width} 
      alt="Food Image"
    />
  );
};

export default Index;

Index.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string.isRequired,
};

Index.defaultProps = {
  width: '100%',
};
