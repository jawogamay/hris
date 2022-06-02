import React from 'react';
import renderer from 'react-test-renderer';
import Login from '@/pages/login';

describe('Login Page', () => {
  it('should render without throwing an error', () => {
    const tree = renderer.create(<Login />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
