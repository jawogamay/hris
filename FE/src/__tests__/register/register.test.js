import React from 'react';
import renderer from 'react-test-renderer';
import Register from '@/pages/register/success';

describe('Register Page', () => {
  it('should render without throwing an error', () => {
    const tree = renderer.create(<Register />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
