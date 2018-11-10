import React, { Component, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Router } from '../../lib/routes';
import { observer, inject } from 'mobx-react';

const styles = theme => ({
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

@inject('chat')
@observer
class InviteList extends Component {
  acceptInvite = invite => {
    this.removeInvite(invite);
    Router.pushRoute(`/chat/${invite.room}`);
  };

  removeInvite = invite => {
    const { chat } = this.props;
    chat.removeInvites(invite);
  };

  render() {
    const { invites, classes } = this.props;

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
                        this.removeInvite(invite);
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
