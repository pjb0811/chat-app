import { mount } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import Button from 'components/atoms/Button';

describe('atoms', () => {
  describe('<Button />', () => {
    const props = {
      color: 'primary',
      user: { userId: 'test1', socketId: '123qwe' }
    };

    const wrapper = mount(<Button {...props}>test</Button>);

    it('기본 props 전달 확인', () => {
      expect(wrapper.props()).to.deep.equal({ ...props, children: 'test' });
    });

    it('user props가 없을 때 반환되는 컴포넌트 확인', () => {
      wrapper.setProps({ user: {} });
      expect(wrapper.text()).to.equal(null);
    });

    it('click 이벤트 확인', () => {
      wrapper.setProps({
        ...props,
        onClick: () => {
          wrapper.setProps({ ...props, color: 'secondary' });
        }
      });
      wrapper.simulate('click');
      expect(wrapper.props().color).to.equal('secondary');
    });
  });
});
