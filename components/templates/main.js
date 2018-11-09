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

      if (!user.userId || !user.socketId) {
        Router.pushRoute('/');
      }

      socket.on('logout', () => {
        chat.setUser({ userId: '', socketId: '' });
        Router.pushRoute('/');
      });
    }

    logout = () => {
      const { socket } = toJS(this.props.chat.state);
      socket.emit('logout');
    };

    render() {
      const { classes } = this.props;

      return (
        <Fragment>
          <Head>
            <title>chat app</title>
          </Head>
          <AppBar {...this.props} classes={classes} logout={this.logout} />
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
