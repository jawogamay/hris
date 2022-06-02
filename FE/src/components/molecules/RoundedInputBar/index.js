import { TextInput } from "@mantine/core";
import PropTypes from 'prop-types';

const Index = ({ placeholder, width, height, leftIcon, onChange }) => {
  return <TextInput
    placeholder={placeholder}
    radius="xl"
    required
    styles={() => ({
      input: {
        width: width,
        height: height,
        paddingLeft: '45px !important',
      },
      root: {
        padding: 0,
      },
      icon: {
        paddingLeft: '16px',
      }
    })}
    icon={leftIcon}
    onChange={onChange}
  />;
}

export default Index;

Index.propTypes = {
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  leftIcon: PropTypes.node,
};

Index.defaultProps = {
  leftIcon: '',
};
