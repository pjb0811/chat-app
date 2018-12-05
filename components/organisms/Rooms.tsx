import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as Routes from '../../lib/routes';

type Props = {
  rooms: Array<string>;
};

/**
 * 채팅방 목록 컴포넌트
 * @class Rooms
 * @extends {Component<Props>}
 */
class Rooms extends React.Component<Props> {
  /**
   * 렌더링
   * @desc 채팅방 목록을 순회하여 링크가 연결된 채팅방 이름 컴포넌트 반환
   * @returns {Component}
   */
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
