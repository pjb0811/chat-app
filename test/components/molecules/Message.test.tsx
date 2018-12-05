import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import Message, { Props } from 'components/molecules/Message';

describe('molecules', () => {
  describe('<Message />', () => {
    const props: Props = {
      classes: { paper: '', chip: '', myself: '' },
      type: 'text',
      message: 'test 메시지 입니다',
      user: {
        userId: 'you',
        socketId: '1111'
      },
      myself: {
        userId: 'me',
        socketId: '2222'
      },
      images: []
    };

    const wrapper = mount(shallow(<Message {...props} />).get(0));

    it('props 확인', () => {
      expect(wrapper.props().type).to.deep.equal(props.type);
      expect(wrapper.props().message).to.deep.equal(props.message);
      expect(wrapper.props().user).to.deep.equal(props.user);
    });

    it('message element 상태 확인', () => {
      expect(wrapper.find('p').text()).to.equal('test 메시지 입니다');
    });

    it('images element 상태 확인', () => {
      wrapper.setProps({ images: [{ base64: 'test', name: 'test' }] });
      expect(wrapper.find('img').props().alt).to.equal('test');
    });
  });
});
