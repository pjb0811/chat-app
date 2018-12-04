import { mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import Image from 'components/atoms/Image';

describe('atoms', () => {
  describe('<Image />', () => {
    const props = {
      base64: 'test',
      name: 'test'
    };

    const wrapper = mount(<Image {...props} />);

    it('기본 props 전달 확인', () => {
      expect(wrapper.props()).to.deep.equal(props);
    });
  });
});
