import { mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import Test from './AuthTest';

describe('wrappers', () => {
  describe('<withAuth />', () => {
    const props = {
      user: {
        userId: ''
      }
    };
    let wrapper;

    it('userId가 없는 경우 컴포넌트 반환 상태 확인', () => {
      wrapper = mount(<Test {...props} />);
      expect(wrapper.props()).to.deep.equal(props);
      expect(wrapper.html()).to.equal(null);
    });

    it('userId가 잇는 경우 컴포넌트 반환 상태 확인', () => {
      props.user.userId = 'test';
      wrapper = mount(<Test {...props} />);
      expect(wrapper.props()).to.deep.equal(props);
      expect(wrapper.text()).to.equal('test');
    });
  });
});
