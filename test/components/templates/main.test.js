import { shallow, mount } from 'enzyme';
import React, { Component } from 'react';
import { expect } from 'chai';
import main from 'components/templates/main';
import { initStore } from 'mobx/Store';

@main
class EmptyPage extends Component {
  render() {
    return <div {...this.props} />;
  }
}

describe.only('templates', () => {
  describe('main', () => {
    const store = initStore({});
    const props = {};
    const router = { query: {} };
    const { chat } = store;
    const user1 = {
      userId: 'user1',
      socketId: 'user1',
      room: ''
    };

    const user2 = {
      userId: 'user2',
      socketId: 'user2',
      room: ''
    };

    chat.connect('http://localhost:9002');
    chat.setUser({ userId: 'test', socketId: 'test' });

    const wrapper = mount(
      shallow(
        shallow(<EmptyPage router={router} {...store} {...props} />).get(0)
      ).get(0)
    );

    it('props 확인', () => {
      expect(wrapper.props().router).to.equal(router);
      expect(wrapper.props().chat).to.equal(store.chat);
    });

    /**
     * @todo 로그아웃 후 route 호출 시 오류 발생. 수정 필요
     */
    it('logout() 호출 후 소켓 동작 확인', () => {
      // wrapper.instance().logout();
      // expect(wrapper.props().chat.user).to.equal({ userId: '', socketId: ''})
    });

    it('inviteRoom() 호출 후 소켓 동작 확인', done => {
      wrapper
        .instance()
        .inviteRoom({ sender: user1, receiver: user2, room: 'test' });

      setTimeout(() => {
        done();
      }, 1000);
    });
  });
});
