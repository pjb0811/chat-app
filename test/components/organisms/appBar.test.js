import { mount } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import AppBar from 'components/organisms/AppBar';

describe('organisms', () => {
  describe('<AppBar />', () => {
    const props = {
      user: {
        userId: 'test',
        socketId: '111'
      },
      users: [
        {
          userId: 'test',
          socketId: '111'
        }
      ],
      room: '',
      invites: [],
      classes: {},
      inviteRoom: () => {},
      removeInvite: () => {}
    };

    const wrapper = mount(<AppBar {...props} />);
    wrapper.setState({
      userListEl: null,
      inviteListEl: null
    });

    it('props 확인', () => {
      expect(wrapper.props()).to.deep.equal(props);
    });

    it('초대 목록 확인 버튼 클릭 시 상태 변경 확인', () => {
      const inviteButton = mount(wrapper.find('button').get(0));
      inviteButton.simulate('click');
      expect(wrapper.state().inviteListEl).to.not.equal(null);
    });

    it('초대 목록을 닫을 경우 상태 변경 확인', () => {
      wrapper.instance().handleClose({ type: 'inviteListEl' });
      expect(wrapper.state().inviteListEl).to.equal(null);
    });

    it('사용자 목록 확인 버튼 클릭 시 상태 변경 확인', () => {
      const userListButton = mount(wrapper.find('button').get(1));
      userListButton.simulate('click');
      expect(wrapper.state().userListEl).to.not.equal(null);
    });

    it('사용자 목록을 닫을 경우 상태 변경 확인', () => {
      wrapper.instance().handleClose({ type: 'userListEl' });
      expect(wrapper.state().userListEl).to.equal(null);
    });
  });
});
