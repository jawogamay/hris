import PropTypes from 'prop-types';
import { MantineProvider } from '@mantine/core';

const myTheme = {
  fontFamily: 'Mark Pro, sans-serif',
  colors: {
    'green-theme': [
      '#006C52',
      '#006C52',
      '#006C52',
      '#006C52',
      '#006C52',
      '#006C52', //input border
      '#006C52', //button bg
      '#006C52', //href
      '#006C52',
      '#B0DC90', //hover
    ],
  },
  primaryColor: 'green-theme',
  headings: {
    fontFamily: 'Mark Pro, sans-serif'
  },
};

const Main = ({ children, meta }) => (
  <MantineProvider theme={myTheme}>
    <div>
      {meta}
      <div>{children}</div>
    </div>
  </MantineProvider>
);

Main.propTypes = {
  children: PropTypes.node,
  meta: PropTypes.element,
};

Main.defaultProps = {
  children: null,
  meta: null,
};

export default Main;
