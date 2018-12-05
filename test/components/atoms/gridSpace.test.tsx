import { mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import GridSpace, { Props } from 'components/atoms/GridSpace';

describe('atoms', () => {
  describe('<GridSpace />', () => {
    const props: Props = {
      hasSpace: true,
      xs: 6
    };

    const wrapper = mount(<GridSpace {...props} />);

    it('기본 props 전달 확인', () => {
      expect(wrapper.props()).to.deep.equal(props);
    });

    it('hasSpace props가 없을 때 반환되는 컴포넌트 확인', () => {
      wrapper.setProps({ hasSpace: false });
      expect(wrapper.text()).to.equal(null);
    });
  });
});
