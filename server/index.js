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
const users = [];
const rooms = {
  moon: [],
  mercury: [],
  mars: [],
  earth: [],
  pluto: [],
  uranus: []
};

io.on('connection', socket => {
  socket.on('login', user => {
    users.push({
      ...user,
      socketId: socket.id
    });

    socket.emit('login', {
      user: {
        ...user,
        socketId: socket.id
      },
      users
    });
  });

  socket.on('logout', user => {
    users.splice(users.indexOf(user), 1);
    socket.emit('logout', {
      users
    });
    socket.disconnect();
  });

  socket.on('join', data => {
    socket.join(data.room);
    rooms[data.room].push(data.user);
    io.to(data.room).emit('join', {
      members: rooms[data.room],
      messages: [
        {
          type: 'join',
          message: `${data.user.userId}님이 입장했습니다`
        }
      ]
    });
  });

  socket.on('leave', data => {
    socket.leave(data.room);
    rooms[data.room].splice(rooms[data.room].indexOf(data.user), 1);
    io.to(data.room).emit('leave');
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
