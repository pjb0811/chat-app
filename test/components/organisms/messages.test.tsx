import { mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import Messages from 'components/organisms/Messages';

describe('organisms', () => {
  describe('<Messages />', () => {
    const props = {
      messages: [],
      myself: {
        userId: 'test',
        socketId: 'test'
      }
    };

    const wrapper = mount(<Messages {...props} />);

    it('props 확인', () => {
      expect(wrapper.props()).to.deep.equal(props);
    });

    it('기본 출력 요소 확인', () => {
      expect(wrapper.find('div').length).to.equal(2);
    });
  });
});
