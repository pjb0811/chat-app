import { mount } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import ProgressLoader from 'components/atoms/ProgressLoader';

describe('atoms', () => {
  const props = {
    isLoading: true,
    className: 'test'
  };
  const wrapper = mount(<ProgressLoader {...props} />);

  describe('<ProgressLoader />', () => {
    it('기본 props 전달 확인', () => {
      expect(wrapper.props()).to.deep.equal(props);
    });

    it('isLoading props가 false일 때 반환되는 컴포넌트 확인', () => {
      wrapper.setProps({ isLoading: false });
      expect(wrapper.text()).to.equal(null);
    });

    it('element에 적용된 className 확인', () => {
      wrapper.setProps({ isLoading: true });
      expect(wrapper.find('.test').get(0).props.className).to.equal('test');
    });
  });
});
