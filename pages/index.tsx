import React, { Component } from 'react';
import mainTemplate from '../components/templates/main';
import Connect from '../components/organisms/Connect';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

type Props = {
  classes: {
    paper: string;
  };
  chat: {
    connect: () => void;
    socket: {
      io: {
        readyState: string;
      };
      on: (type: string, callback: (res: any) => void) => void;
      emit: (type: string, req: {}) => void;
    };
    setUser: (user: {}) => void;
    setUsers: (users: Array<{}>) => void;
  };
};

class Index extends Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={1}>
            <Connect {...this.props} />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default mainTemplate(Index);
