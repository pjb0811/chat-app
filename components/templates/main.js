import React, { Fragment } from 'react';
import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../organisms/AppBar';

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
  },
  link: {
    cursor: 'pointer'
  }
});

const main = Page => {
  class MainWrapper extends React.Component {
    static async getInitialProps(ctx) {
      return {
        ...(Page.getInitialProps ? await Page.getInitialProps(ctx) : null)
      };
    }

    render() {
      const { classes } = this.props;

      return (
        <Fragment>
          <Head>
            <title>chat app</title>
          </Head>
          <AppBar classes={classes} />
          <div className={classes.root}>
            <Page {...this.props} classes={classes} />
          </div>
        </Fragment>
      );
    }
  }

  return withStyles(styles, { name: 'MainWrapper' })(MainWrapper);
};

export default main;
