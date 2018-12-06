import * as React from 'react';
import mainTemplate from '../components/templates/main';
import Rooms from '../components/organisms/Rooms';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

type Props = {
  classes: {
    paper: string;
  };
};

/**
 * 채팅방 목록 컴포넌트
 * @class List
 * @extends {Component<Props>}
 */
class List extends React.Component<Props> {
  state = {
    rooms: ['Moon', 'Mercury', 'Mars', 'Earth', 'Pluto', 'Uranus']
  };

  /**
   * 렌더링
   * 채팅방 목록 라우팅을 처리하는 컴포넌트 반환
   * @returns {Component}
   */
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
