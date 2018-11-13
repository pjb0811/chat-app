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

describe('templates', () => {
  describe('main', () => {
    const store = initStore({});
    const props = {};
    const router = { query: {} };
    const user = {
      userId: 'user',
      socketId: 'user'
    };

    store.chat.setUser(user);

    const wrapper = mount(
      shallow(
        shallow(<EmptyPage router={router} {...store} {...props} />).get(0)
      ).get(0)
    );
    const { chat } = wrapper.props();
    wrapper.setState({});

    chat.connect('http://localhost:9002');

    it('props 확인', () => {
      expect(wrapper.props().router).to.equal(router);
      expect(chat).to.equal(store.chat);
    });

    it('logout() 호출 후 logout socket 동작 확인', done => {
      wrapper.instance().logout();
      chat.socket.on('logout', () => {
        chat.setUser({ userId: '', socketId: '' });
        expect(chat.user).to.deep.equal({
          userId: '',
          socketId: ''
        });
        done();
      });
    });

    describe('inviteRoom() 및 removeInvite() 호출하기', () => {
      let tempUser = {};
      let tempInvite = {};
      it('inviteRoom() 호출 전 다른 사용자 로그인 하기', done => {
        chat.socket.on('login', ({ user }) => {
          tempUser = user;
          expect(user.userId).to.equal('test');
          done();
        });
        chat.socket.emit('login', {
          user: {
            userId: 'test'
          }
        });
      });

      it('inviteRoom() 호출 후 상태 확인', done => {
        wrapper
          .instance()
          .inviteRoom({ sender: user, receiver: tempUser, room: 'test' });
        chat.socket.on('inviteRoom', data => {
          expect(data.sender).to.deep.equal(user);
          expect(data.room).to.equal('test');
          tempInvite = data;
          chat.setInvites(data);
          done();
        });
      });

      it('removeInvite() 호출 후 상태 확인', () => {
        wrapper.instance().removeInvite(tempInvite);
        expect(chat.invites.length).to.equal(0);
        chat.disconnect();
      });
    });
  });
});
