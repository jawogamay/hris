import PropTypes from 'prop-types';
import CloseCircle from "@/icons/CloseCircle";
import { Box, Text } from "@mantine/core";

const Index = ({ children, setOpened, compact }) => {
  return (
    <Box
      sx={{
        padding: compact ? '0px' : '34px 32px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text sx={{ fontSize: compact ? '24px' : '28px', fontWeight: compact ? 700 : 500 }}>
        {children}
      </Text>
      <Box onClick={() => setOpened(false)} sx={{ cursor: 'pointer' }}>
        <CloseCircle width={41} height={41} />
      </Box>
    </Box>
  );
}

export default Index;

Index.propTypes = {
  children: PropTypes.node.isRequired,
  setOpened: PropTypes.func.isRequired,
  compact: PropTypes.bool,
};

Index.defaultProps = {
  compact: false,
};
