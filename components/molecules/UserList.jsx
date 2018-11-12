import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InviteButton from '../atoms/InviteButton';

class UserList extends Component {
  render() {
    const { users, room, inviteRoom } = this.props;
    const myself = this.props.user;

    return (
      <Paper>
        <List style={{ maxWidth: '100%', maxHeight: 300, overflow: 'auto' }}>
          {users.map((user, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={user.userId}
                primaryTypographyProps={{
                  variant: 'button',
                  color: 'textPrimary',
                  noWrap: true
                }}
                secondary={myself.socketId === user.socketId ? '사용자' : ''}
              />
              <InviteButton
                myself={myself}
                user={user}
                room={room}
                inviteRoom={inviteRoom}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

export default UserList;
