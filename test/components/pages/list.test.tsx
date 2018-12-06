import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import List from 'pages/list';
import { initStore } from 'mobx/Store';

describe('pages', () => {
  describe('<List />', () => {
    const store = initStore({
      chat: null
    }) as any;
    const router = { query: {} };
    const props = {
      classes: {}
    };
    const user = {
      userId: 'user',
      socketId: 'user'
    };

    store.chat.setUser(user);

    const wrapper = mount(
      shallow(
        shallow(
          shallow(<List router={router} {...store} {...props} />).get(0)
        ).get(0)
      ).get(0)
    );

    const wrappedComponent = wrapper
      .childAt(0)
      .childAt(2)
      .childAt(0);
    const { chat } = wrapper.props();

    it('props 확인', () => {
      expect(wrapper.props().router).to.equal(router);
      expect(chat).to.equal(store.chat);
    });

    it('state 확인', () => {
      expect(wrappedComponent.state().rooms.length).to.equal(6);
      expect(wrappedComponent.state().rooms).to.include('Moon');
    });
  });
});
