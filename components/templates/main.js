import React, { Fragment } from 'react';
import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../organisms/AppBar';
import { observer, inject } from 'mobx-react';
import { Router } from '../../lib/routes';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2,
    overflow: 'hidden'
  },
  space: {
    ...theme.mixins.toolbar,
    marginBottom: 10
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

const withMain = Page => {
  @inject('chat')
  @observer
  class MainWrapper extends React.Component {
    static async getInitialProps(ctx) {
      return {
        ...(Page.getInitialProps ? await Page.getInitialProps(ctx) : null)
      };
    }

    componentDidMount() {
      const { chat } = this.props;
      const { user, socket } = chat;

      if (!user.userId || !user.socketId) {
        Router.pushRoute('/');
      }

      if (socket) {
        socket.on('logout', () => {
          chat.setUser({ userId: '', socketId: '' });
          // Router.push('/');
          document.location.replace('/');
        });

        socket.on('updateUsers', ({ users }) => {
          chat.setUsers(users);
        });

        socket.on('inviteRoom', data => {
          chat.setInvites(data);
        });
      }
    }

    logout = () => {
      const { socket } = this.props.chat;
      socket.emit('logout');
    };

    inviteRoom = ({ sender, receiver, room }) => {
      const { socket } = this.props.chat;
      socket.emit('inviteRoom', {
        sender,
        receiver,
        room
      });
    };

    removeInvite = invite => {
      const { chat } = this.props;
      chat.removeInvites(invite);
    };

    moveRoom = ({ type, room }) => {
      const { user, socket } = this.props.chat;

      socket.emit(type, {
        user,
        room
      });
    };

    render() {
      const { classes, router, chat } = this.props;
      const { user, users, invites } = chat;

      return (
        <Fragment>
          <Head>
            <title>chat app</title>
          </Head>
          <AppBar
            user={user}
            users={users}
            invites={invites}
            classes={classes}
            room={router.query.room}
            logout={this.logout}
            inviteRoom={this.inviteRoom}
            removeInvite={this.removeInvite}
            moveRoom={this.moveRoom}
          />
          <div className={classes.root}>
            <Page {...this.props} classes={classes} />
          </div>
        </Fragment>
      );
    }
  }

  return withStyles(styles, { name: 'MainWrapper' })(MainWrapper);
};

export default withMain;
