import PropTypes from 'prop-types';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, { bg, radius, size }) => ({
  button: {
    color: theme.white,
    backgroundColor: theme.colors[bg][6],
    borderRadius: radius,
    padding: theme.spacing[size],
    width: '100%',
    fontWeight: 'bold',
    border: 0,
    cursor: 'pointer',
    transition: '0.3s',

    '&:hover': {
      opacity: 0.9,
    },
  },
}));

const Index = ({ children, bg, radius, size }) => {
  const { classes } = useStyles({ bg, radius, size });
  return (
    <button type='button' className={classes.button}>
      {children}
    </button>
  );
};

export default Index;

Index.propTypes = {
  children: PropTypes.node.isRequired,
  bg: PropTypes.string,
  radius: PropTypes.number,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Index.defaultProps = {
  bg: 'green-theme',
  radius: 4,
  size: 'md',
};
