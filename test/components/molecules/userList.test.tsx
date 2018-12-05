import { mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import UserList, { Props } from 'components/molecules/UserList';

describe('molecules', () => {
  describe('<UserList />', () => {
    const props: Props = {
      user: {
        userId: 'test',
        socketId: '111',
        room: '',
        windows: []
      },
      users: [
        {
          userId: 'test',
          socketId: '111',
          room: '',
          windows: []
        }
      ],
      room: '',
      inviteRoom: () => {},
      toggleWindow: () => {}
    };

    const wrapper = mount(<UserList {...props} />);
    wrapper.setState({ message: '' });

    it('props 확인', () => {
      expect(wrapper.props()).to.deep.equal(props);
    });
  });
});
