import { mount } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import InputArea from 'components/organisms/InputArea';

describe('organisms', () => {
  describe('<InputArea />', () => {
    const props = {
      classes: {}
    };
    const wrapper = mount(<InputArea {...props} />);

    it('props 확인', () => {
      expect(wrapper.props()).to.deep.equal(props);
    });

    it('기본 출력 요소 확인', () => {
      expect(wrapper.find('div').length).to.equal(1);
    });
  });
});
