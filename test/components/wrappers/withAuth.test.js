import { mount } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import withAuth from 'components/wrappers/withAuth';

@withAuth
class Test extends React.Component {
  render() {
    return <div>test</div>;
  }
}

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
