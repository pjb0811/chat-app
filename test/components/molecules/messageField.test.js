import { mount } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import MessageField from 'components/molecules/MessageField';

describe('molecules', () => {
  describe('<MessageField />', () => {
    let temp;
    const props = {
      classes: {},
      sendMessage: data => {
        temp = data;
      }
    };

    const wrapper = mount(<MessageField {...props} />);
    wrapper.setState({ message: '' });

    it('props 확인', () => {
      expect(wrapper.props().message).to.deep.equal(props.message);
    });

    it('message 변경 시 상태 확인', () => {
      const textarea = mount(wrapper.find('textarea').get(2));
      textarea.simulate('change', { target: { value: 'Hello' } });
      expect(wrapper.state().message).to.equal('Hello');
    });

    it('sendMessage() 호출 시 상태 확인', () => {
      wrapper.instance().sendMessage();
      expect(temp).to.deep.equal({ type: 'text', message: 'Hello' });
      expect(wrapper.state().message).to.equal('');
      wrapper.instance().sendMessage();
      expect(temp).to.deep.equal({ type: 'text', message: 'Hello' });
    });
  });
});
