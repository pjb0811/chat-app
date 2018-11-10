import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InviteButton from '../atoms/InviteButton';

class InviteList extends Component {
  render() {
    const { invites } = this.props;
    console.log(invites);

    return (
      <Paper>
        <List>
          {invites.map((invite, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={invite.room}
                primaryTypographyProps={{
                  variant: 'button',
                  color: 'textPrimary',
                  noWrap: true
                }}
              />
              {/* <InviteButton
                myself={myself}
                user={user}
                room={room}
                inviteRoom={inviteRoom}
              /> */}
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

export default InviteList;
