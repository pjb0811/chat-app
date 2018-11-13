import { shallow, mount } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import Index from 'pages/index';
import { initStore } from 'mobx/Store';

describe('pages', () => {
  describe('<Index />', () => {
    const store = initStore({});
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
        shallow(<Index router={router} {...store} {...props} />).get(0)
      ).get(0)
    );

    const { chat } = wrapper.props();

    it('props 확인', () => {
      expect(wrapper.props().router).to.equal(router);
      expect(chat).to.equal(store.chat);
    });
  });
});
