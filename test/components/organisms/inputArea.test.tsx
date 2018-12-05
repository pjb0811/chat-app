import { mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import InputArea, { Props } from 'components/organisms/InputArea';

describe('organisms', () => {
  describe('<InputArea />', () => {
    const props: Props = {
      classes: {
        root: '',
        inputContainer: '',
        input: '',
        buttonContainer: '',
        button: ''
      },
      sendMessage: () => {}
    };
    const wrapper = mount(<InputArea {...props} />);

    it('props 확인', () => {
      expect(wrapper.props()).to.deep.equal(props);
    });

    it('기본 출력 요소 확인', () => {
      expect(wrapper.html()).to.null;
    });
  });
});
