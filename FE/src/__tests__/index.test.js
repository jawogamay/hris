import React from 'react';
import renderer from 'react-test-renderer';
import Index from '@/pages/index';

describe('Index Page', () => {
  it('should render without throwing an error', () => {
    const tree = renderer.create(<Index />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
