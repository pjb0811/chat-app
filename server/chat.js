const chatServer = server => {
  const io = require('socket.io').listen(server);
  let users = [];

  io.on('connection', socket => {
    socket.on('login', ({ user }) => {
      if (user.userId) {
        users.push({
          userId: user.userId,
          socketId: socket.id
        });
      }

      socket.emit('login', {
        user: {
          ...user,
          socketId: socket.id
        }
      });

      io.emit('updateUsers', {
        users
      });
    });

    socket.on('logout', () => {
      users = users.filter(user => user.socketId !== socket.id);
      socket.emit('logout');

      io.emit('updateUsers', {
        users
      });
    });

    socket.on('disconnect', () => {
      users = users.filter(user => user.socketId !== socket.id);
    });

    socket.on('join', ({ room, user }) => {
      socket.join(room);
      users = users.filter(
        currentUser => currentUser.socketId !== user.socketId
      );

      if (user.userId) {
        users.push({
          userId: user.userId,
          socketId: socket.id,
          room
        });
      }

      socket.emit('updateUser', {
        user: {
          ...user,
          socketId: socket.id
        }
      });

      io.emit('updateUsers', {
        users
      });

      io.to(room).emit('join', {
        messages: {
          user: {
            ...user,
            socketId: socket.id
          },
          type: 'info',
          message: `${user.userId}님이 입장했습니다.`,
          images: []
        }
      });
    });

    socket.on('chat', ({ room, user, type, message, images }) => {
      io.to(room).emit('chat', {
        messages: {
          user,
          type,
          message,
          images
        }
      });
    });

    socket.on('leave', ({ room, user }) => {
      socket.leave(room);

      users = users.map(user => {
        if (user.socketId === socket.id) {
          user.room = '';
        }
        return user;
      });

      io.emit('updateUsers', {
        users
      });

      io.to(room).emit('leave', {
        messages: {
          user,
          type: 'info',
          message: `${user.userId}님이 퇴장했습니다.`,
          images: []
        }
      });
    });

    socket.on('inviteRoom', ({ sender, receiver, room }) => {
      const time = new Date().getTime();
      io.to(receiver.socketId).emit('inviteRoom', {
        sender,
        room,
        time
      });
    });
  });
};

module.exports = chatServer;
