import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { createExample } from '../oneshot';

describe('ui teast', () => {
  test('render', () => {
    const Example = createExample();
    const component = renderer.create(
      <Example />
    );
    expect(<Example />).not.toBeUndefined();
    expect(component.toJSON()).not.toBeNull();
  });

  test('createElement', () => {
    const TestDiv = () => React.createElement('div', null);
    const testDivComponent = renderer.create(<TestDiv />);
    const expectDivComponent = renderer.create(<div />);
    const tree1 = testDivComponent.toJSON()!;
    const tree2 = expectDivComponent.toJSON()!;
    expect(tree1.props).toEqual(tree2.props);
  });
});
