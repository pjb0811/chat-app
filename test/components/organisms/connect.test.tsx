import { mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import Connect, { Props } from 'components/organisms/Connect';
import { initStore } from 'mobx/Store';

describe('organisms', () => {
  describe('<Connect />', () => {
    const store = initStore({
      chat: null
    });
    const wrapper = mount(<Connect {...store as Props} />) as any;
    const { chat } = wrapper.props();

    wrapper.setState({
      form: {
        userId: ''
      }
    });

    beforeEach(() => {
      chat.connect('http://localhost:9002');
    });

    afterEach(() => {
      chat.disconnect();
    });

    it('props 확인', () => {
      expect(wrapper.props()).to.deep.equal(store);
    });

    it('onConnect 함수 호출 시 유효성 검증 및 login socket 확인', done => {
      let errors, submitting;
      const values = { userId: 'test' };
      const setErrors = (res: {}) => {
        errors = res;
      };
      const setSubmitting = (_res: {}) => {
        submitting = false;
      };

      chat.disconnect();
      wrapper.instance().onConnect(values, { setErrors, setSubmitting });
      expect(errors).to.deep.equal({
        userId: '새로고침 후 다시 접속해주세요.'
      });
      expect(submitting).to.be.false;

      chat.connect('http://localhost:9002');
      wrapper.instance().onConnect(values, { setErrors, setSubmitting });

      chat.socket.on('login', (params: { user: { userId: string } }) => {
        expect(params.user.userId).to.equal('test');
        done();
      });
    });

    it('onConnect 함수 호출 시 updateUsers socket 확인', done => {
      const values = { userId: 'test' };
      const setErrors = () => {};
      const setSubmitting = () => {};

      wrapper.instance().onConnect(values, { setErrors, setSubmitting });

      chat.socket.on('updateUsers', (params: { users: Array<{}> }) => {
        expect(params.users.length).to.equal(1);
        done();
      });
    });
  });
});
