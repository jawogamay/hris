import { Paper } from "@mantine/core";
import PropTypes from 'prop-types';


const Index = ({ children }) => {
  return <Paper
    sx={{
      padding: '22px 24px'
    }}
    shadow="sm"
  >
    {children}
  </Paper>;
}

export default Index;

Index.propTypes = {
  children: PropTypes.node.isRequired,
};
