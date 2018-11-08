import React, { Component } from 'react';
import mainTemplate from '../components/templates/main';
import Connect from '../components/organisms/Connect';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class Index extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={1}>
            <Connect />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default mainTemplate(Index);
