import React, { Component, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import * as Routes from '../../lib/routes';
import { Theme, createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    list: {
      maxWidth: '100%',
      maxHeight: 300,
      overflow: 'auto'
    },
    listItem: {
      flexDirection: 'column'
    },
    button: {
      margin: theme.spacing.unit
    }
  });

type Props = {
  removeInvite: (invite: {}) => void;
  moveRoom: (params: { type: string; room: string }) => void;
  room: string;
  invites: Array<{ sender: { userId: string }; room: string; time: number }>;
  classes: {
    list: string;
    listItem: string;
    button: string;
  };
};

class InviteList extends Component<Props> {
  acceptInvite = (invite: { room: string }) => {
    const { removeInvite, moveRoom, room } = this.props;
    removeInvite(invite);
    if (room) {
      moveRoom({ type: 'leave', room });
      moveRoom({ type: 'join', room: invite.room });
    }
    Routes.Router.pushRoute(`/chat/${invite.room}`);
  };

  render() {
    const { invites, classes, removeInvite } = this.props;

    return (
      <Paper>
        <List className={classes.list}>
          {invites.map((invite, i) => {
            const { sender, room, time } = invite;
            return (
              <Fragment key={i}>
                <ListItem className={classes.listItem}>
                  <Typography variant="h6" gutterBottom>
                    {new Date(time).toLocaleString('ko-KR')}
                  </Typography>
                  <Typography variant="body1">
                    {sender.userId}님이 {room} 채널로 초대하였습니다.
                  </Typography>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      onClick={() => {
                        this.acceptInvite(invite);
                      }}
                    >
                      ACCEPT
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      className={classes.button}
                      onClick={() => {
                        removeInvite(invite);
                      }}
                    >
                      DECLINE
                    </Button>
                  </div>
                </ListItem>
                {i < invites.length - 1 && <Divider />}
              </Fragment>
            );
          })}
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles, { name: 'InviteList' })(InviteList);
