import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { config } from 'react-transition-group';

React.useLayoutEffect = React.useEffect;

configure({ adapter: new Adapter() });
global.beforeEach(() => {
  config.disabled = true;
});
