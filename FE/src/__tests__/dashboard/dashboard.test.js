import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from '@/pages/dashboard';

describe('Dashboard Page', () => {
  it('should render without throwing an error', () => {
    const tree = renderer.create(<Dashboard />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
