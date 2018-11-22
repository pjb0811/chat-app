import React, { Component } from 'react';
import mainTemplate from '../components/templates/main';
import Rooms from '../components/organisms/Rooms';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

type Props = {
  classes: {
    paper: string;
  };
};

class List extends Component<Props> {
  state = {
    rooms: ['Moon', 'Mercury', 'Mars', 'Earth', 'Pluto', 'Uranus']
  };

  render() {
    const { classes } = this.props;
    const { rooms } = this.state;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={1}>
            <Rooms rooms={rooms} />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default mainTemplate(List);
