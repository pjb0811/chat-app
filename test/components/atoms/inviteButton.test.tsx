import { mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import InviteButton, { Props } from 'components/atoms/InviteButton';

describe('atoms', () => {
  describe('<InviteButton />', () => {
    const props: Props = {
      myself: {
        userId: 'test1',
        socketId: '1',
        room: 'moon'
      },
      user: {
        userId: 'test',
        socketId: '2',
        room: 'moon',
        windows: []
      },
      room: 'moon2',
      onClick: () => {}
    };

    const wrapper = mount(<InviteButton {...props} />);

    it('기본 props 전달 확인', () => {
      expect(wrapper.props()).to.deep.equal(props);
    });

    it('room props가 없을 때 반환되는 컴포넌트 확인', () => {
      wrapper.setProps({ room: '' });
      expect(wrapper.text()).to.equal(null);
    });

    it('자신의 socketId와 초대할 사용자의 socketId 가 같을 경우 반환되는 컴포넌트 확인', () => {
      wrapper.setProps({
        myself: {
          ...props.myself,
          socketId: 1
        },
        user: {
          ...props.user,
          socketId: 1
        }
      });
      expect(wrapper.text()).to.equal(null);
    });

    it('자신의 room과 초대할 사용자의 room이 같을 경우 반환되는 컴포넌트 확인', () => {
      wrapper.setProps({
        room: 'moon2',
        user: {
          ...props.user,
          room: 'moon2'
        }
      });
      expect(wrapper.text()).to.equal(null);
    });

    it('click 이벤트 호출 시 onClick 함수 호출 확인', () => {
      wrapper.setProps({
        ...props,
        onClick: () => {
          wrapper.setProps({ ...props, click: true });
        }
      });
      wrapper.simulate('click');
      expect(wrapper.props().click).to.be.true;
    });
  });
});
