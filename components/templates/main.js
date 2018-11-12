import React, { Fragment } from 'react';
import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../organisms/AppBar';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Router } from '../../lib/routes';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2
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
      const { user, socket } = toJS(this.props.chat.state);
      this.mounted = true;

      if (!user.userId || !user.socketId) {
        Router.pushRoute('/');
      }

      if (socket && this.mounted) {
        socket.on('logout', () => {
          chat.setUser({ userId: '', socketId: '' });
          Router.pushRoute('/');
        });

        socket.on('updateUsers', ({ users }) => {
          chat.setUsers(users);
        });

        socket.on('inviteRoom', data => {
          chat.setInvites(data);
        });
      }
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    logout = () => {
      const { socket } = toJS(this.props.chat.state);
      socket.emit('logout');
    };

    inviteRoom = ({ sender, receiver, room }) => {
      const { socket } = toJS(this.props.chat.state);
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

    render() {
      const { classes, router } = this.props;
      const { user, users, invites } = toJS(this.props.chat.state);

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
