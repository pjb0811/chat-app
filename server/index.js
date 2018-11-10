const express = require('express')();
const server = require('http').createServer(express);
const io = require('socket.io').listen(server);

const next = require('next');
const mobxReact = require('mobx-react');

const routes = require('../lib/routes');
const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV;
const dev = env !== 'production';
const app = next({
  dir: '.',
  dev
});

const routeHandler = routes.getRequestHandler(app);
let users = [];

io.on('connection', socket => {
  socket.on('login', ({ user }) => {
    users.push({
      userId: user.userId,
      socketId: socket.id
    });

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

    users.splice(users.indexOf(user), 1);
    users.push({
      userId: user.userId,
      socketId: socket.id,
      room
    });

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
        message: `${user.userId}님이 입장했습니다.`
      }
    });
  });

  socket.on('chat', ({ room, user, type, message }) => {
    io.to(room).emit('chat', {
      messages: {
        user,
        type,
        message
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
        message: `${user.userId}님이 퇴장했습니다.`
      }
    });
  });
});

mobxReact.useStaticRendering(true);

app
  .prepare()
  .then(() => {
    express.use(routeHandler);

    server.listen(port, err => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on port ${port} [${env}]`);
    });
  })
  .catch(err => {
    console.log('An error occurred, unable to start the express');
    console.log(err);
  });
