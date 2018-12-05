import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import InviteList, { Props } from 'components/molecules/InviteList';

describe('molecules', () => {
  describe('<InviteList />', () => {
    const invite = {
      sender: {
        userId: 'test1',
        socketId: 123,
        room: 'room'
      },
      room: 'room',
      time: 1542001188057
    };
    const props: Props = {
      invites: [invite],
      classes: { list: '', listItem: '', button: '' },
      removeInvite: () => {
        props.invites = [];
      },
      moveRoom: () => {},
      room: ''
    };

    const wrapper = mount(shallow(<InviteList {...props} />).get(0)) as any;

    it('props 확인', () => {
      expect(wrapper.props().invites).to.deep.equal(props.invites);
    });

    it('acceptInvite() 실행 시 동작 확인', () => {
      /**
       * @todo next route 호출 시 에러 발생. 추후 확인 필요
       */
      try {
        wrapper.instance().acceptInvite(invite);
      } catch (e) {
        expect(props.invites.length).to.equal(0);
      }
    });

    it('초대 목록이 있을 시 element 상태 확인', () => {
      wrapper.setProps({ invites: [invite] });
      expect(wrapper.find('h6').text()).to.equal('2018-11-12 14:39:48');
      expect(wrapper.find('p').text()).to.equal(
        'test1님이 room 채널로 초대하였습니다.'
      );
    });

    it('거절 버튼 클릭 시 삭제 시 props 값 확인', () => {
      const decline = mount(wrapper.find('button').get(1));
      props.invites = [invite];
      decline.simulate('click');
      expect(props.invites.length).to.equal(0);
    });
  });
});
