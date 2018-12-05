import { mount, ReactWrapper, HTMLAttributes } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import Rooms from 'components/organisms/Rooms';

describe('organisms', () => {
  describe('<Rooms />', () => {
    const props = {
      rooms: ['Moon', 'Mercury', 'Mars', 'Earth', 'Pluto', 'Uranus']
    };

    const wrapper = mount(<Rooms {...props} />);

    it('props 확인', () => {
      expect(wrapper.props()).to.deep.equal(props);
    });

    it('기본 출력 요소 확인', () => {
      let buttons: Array<
      ReactWrapper<HTMLAttributes, any, React.Component<{}, {}, any>>
      > = [];
      wrapper.find('span').forEach(span => {
        if (span.text()) {
          buttons.push(span);
        }
      });

      buttons.forEach((button, i) => {
        expect(button.text()).to.equal(props.rooms[i]);
      });
    });
  });
});
