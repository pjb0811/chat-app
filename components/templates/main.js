import React from 'react';
import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
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
        <div className={classes.root}>
          <Head>
            <title>chat app</title>
          </Head>
          <Page {...this.props} />
        </div>
      );
    }
  }

  return withStyles(styles, { name: 'MainWrapper' })(MainWrapper);
};

export default main;
