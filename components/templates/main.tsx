import React, { Fragment } from 'react';
import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../organisms/AppBar';
import { observer, inject } from 'mobx-react';
import * as Routes from '../../lib/routes';
import { Theme, createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
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

type Props = {
  chat: {
    user: { userId: string; socketId: string; room: string };
    users: Array<{ userId: string; socketId: string; room: string }>;
    invites: Array<{ sender: { userId: string }; room: string; time: number }>;
    socket: {
      on: (type: string, callback: (res: any) => void) => void;
      emit: (type: string, req?: {}) => void;
    };
    setUser: (user: {}) => void;
    setUsers: (users: Array<{}>) => void;
    setInvites: ({}) => void;
    removeInvites: ({}) => void;
  };
  classes: {
    root: string;
    space: string;
  };
  router: {
    query: {
      room: string;
    };
  };
};

const withMain = (Page: any) => {
  @inject('chat')
  @observer
  class MainWrapper extends React.Component<Props> {
    static async getInitialProps(ctx: {}) {
      return {
        ...(Page.getInitialProps ? await Page.getInitialProps(ctx) : null)
      };
    }

    componentDidMount() {
      const { chat } = this.props;
      const { user, socket } = chat;

      if (!user.userId || !user.socketId) {
        Routes.Router.pushRoute('/');
      }

      if (socket) {
        socket.on('logout', () => {
          chat.setUser({ userId: '', socketId: '' });
          (document.location as Location).replace('/');
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

    inviteRoom = (params: { sender: {}; receiver: {}; room: string }) => {
      const { socket } = this.props.chat;
      const { sender, receiver, room } = params;

      socket.emit('inviteRoom', {
        sender,
        receiver,
        room
      });
    };

    removeInvite = (invite: {}) => {
      const { chat } = this.props;
      chat.removeInvites(invite);
    };

    moveRoom = (params: { type: string; room: string }) => {
      const { user, socket } = this.props.chat;
      const { type, room } = params;

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
