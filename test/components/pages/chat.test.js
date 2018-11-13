import { shallow, mount } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import Chat from 'pages/chat';
import { initStore } from 'mobx/Store';

describe.only('pages', () => {
  describe('<Chat />', () => {
    const store = initStore({});
    const router = { query: { room: 'moon' } };
    const props = {
      classes: {}
    };
    const user = {
      userId: 'user',
      socketId: 'user'
    };

    const otherUser = {
      userId: 'otherUser',
      socketId: 'otherUser'
    };

    store.chat.setUser(user);

    const wrapper = mount(
      shallow(
        shallow(<Chat router={router} {...store} {...props} />).get(0)
      ).get(0)
    );

    const wrappedComponent = wrapper.childAt(2).childAt(0);

    const { chat } = wrapper.props();
    wrapper.setState({ messages: [] });

    chat.connect('http://localhost:9002');

    it('props 확인', () => {
      expect(wrapper.props().router).to.equal(router);
      expect(chat).to.equal(store.chat);
    });

    describe('join, chat, leave 소켓 동작 확인', () => {
      chat.socket.on('join', data => {
        wrappedComponent.instance().receiveMessage(data);
      });

      it('사용자 채널 입장 시 동작 확인 및 receiveMessage() 호출 시 상태 확인', done => {
        chat.socket.emit('join', {
          user,
          room: 'moon'
        });

        chat.socket.emit('join', {
          user: otherUser,
          room: 'moon'
        });

        setTimeout(() => {
          expect(wrappedComponent.state().messages.length).to.equal(2);
          done();
        }, 3000);
      }).timeout(5000);

      it('sendMessage() 호출 시 chat socket 동작 확인', done => {
        wrappedComponent
          .instance()
          .sendMessage({ type: 'text', message: 'test입니다', images: [] });
        chat.socket.on('chat', data => {
          const { messages } = data;
          const { user, type, message } = messages;
          wrappedComponent.instance().receiveMessage(data);
          expect(user.userId).to.equal('user');
          expect(type).to.equal('text');
          expect(message).to.equal('test입니다');
          expect(wrappedComponent.state().messages.length).to.equal(3);
          done();
        });
      });

      it('leave socket 동작 확인 및 receiveMessage() 호출 시 동작 상태 확인', done => {
        chat.socket.emit('leave', {
          user,
          room: 'moon'
        });
        chat.socket.on('leave', data => {
          const { messages } = data;
          const { user, type, message } = messages;
          expect(user.userId).to.equal('user');
          expect(type).to.equal('info');
          expect(message).to.equal('user님이 퇴장했습니다.');
          wrappedComponent.instance().receiveMessage(data);
          console.log(wrappedComponent.state().messages.length);
          // expect(wrappedComponent.state().messages.length).to.equal(3);
          done();
        });
      }).timeout(5000);
      chat.disconnect();
    });
  });
});
