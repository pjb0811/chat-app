import { mount } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import UserList from 'components/molecules/UserList';

describe.only('molecules', () => {
  describe('<UserList />', () => {
    const props = {
      user: {
        userId: 'test',
        socketId: '111'
      },
      users: [
        {
          userId: 'test',
          socketId: '111'
        }
      ],
      room: '',
      inviteRoom: () => {}
    };

    const wrapper = mount(<UserList {...props} />);
    wrapper.setState({ message: '' });

    it('props 확인', () => {
      expect(wrapper.props()).to.deep.equal(props);
    });
  });
});
