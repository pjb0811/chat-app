import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as Routes from '../../lib/routes';

type Props = {
  rooms: Array<string>;
};

class Rooms extends Component<Props> {
  render() {
    const { rooms } = this.props;
    return (
      <List component="nav">
        {rooms.map((room, i) => (
          <ListItem button key={i}>
            <Routes.Link route={`/chat/${room.toLowerCase()}`}>
              <ListItemText primary={room} />
            </Routes.Link>
          </ListItem>
        ))}
      </List>
    );
  }
}

export default Rooms;
