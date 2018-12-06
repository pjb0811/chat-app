import * as React from 'react';
import mainTemplate from '../components/templates/main';
import Connect from '../components/organisms/Connect';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { User } from '../mobx/Chat';

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
    user: User;
    setUser: (user: User) => void;
    setUsers: (users: Array<User>) => void;
  };
};

/**
 * 로그인 페이지
 * @class Index
 * @extends {Component<Props>}
 */
class Index extends React.Component<Props> {
  /**
   * 렌더링
   * @desc 로그인 폼 컴포넌트 반환
   * @returns {Component}
   */
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
