import { mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import IconButton from 'components/atoms/IconButton';

describe('atoms', () => {
  describe('<IconButton />', () => {
    const props = {
      color: 'primary',
      user: { userId: 'test1', socketId: '123qwe' }
    };

    const wrapper = mount(<IconButton {...props as any}>test</IconButton>);

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
