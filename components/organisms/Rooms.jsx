import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from '../../lib/routes';
import io from 'socket.io-client';

class Rooms extends Component {
  componentDidMount() {
    this.socket = io();
    this.socket.emit('list', {
      userid: 'test'
    });
    this.socket.on('list', data => {
      console.log(data);
    });
  }

  render() {
    const { rooms } = this.props;
    return (
      <List component="nav">
        {rooms.map((room, i) => (
          <ListItem button key={i}>
            <Link route={`/chat/${room.toLowerCase()}`}>
              <ListItemText primary={room} />
            </Link>
          </ListItem>
        ))}
      </List>
    );
  }
}

export default Rooms;