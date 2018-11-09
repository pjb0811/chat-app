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
/* 
const rooms = {
  moon: [],
  mercury: [],
  mars: [],
  earth: [],
  pluto: [],
  uranus: []
}; 
*/

io.on('connection', socket => {
  socket.on('login', user => {
    io.sockets.connected[socket.id].userId = user.userId;

    socket.emit('login', {
      user: {
        ...user,
        socketId: socket.id
      },
      users: Object.keys(io.sockets.connected).map(id => ({
        userId: io.sockets.connected[id].userId,
        socketId: id
      }))
    });
  });

  socket.on('logout', users => {
    socket.emit('logout', {
      users: users.filter(user => user.socketId !== socket.id)
    });
    io.sockets.connected[socket.id].disconnect();
  });

  socket.on('join', data => {
    socket.join(data.room);

    io.of('/')
      .in(data.room)
      .clients((err, clients) => {
        console.log(data.room, clients, socket.id);
      });
    // rooms[data.room].push(data.user);
    io.to(data.room).emit('join', {
      // members: rooms[data.room],
      messages: {
        user: data.user,
        type: 'info',
        message: `${data.user.userId}님이 입장했습니다.`
      }
    });
  });

  socket.on('leave', data => {
    socket.leave(data.room);
    // rooms[data.room].splice(rooms[data.room].indexOf(data.user), 1);
    io.to(data.room).emit('leave', {
      // members: rooms[data.room],
      messages: {
        user: data.user,
        type: 'info',
        message: `${data.user.userId}님이 퇴장했습니다.`
      }
    });
  });

  socket.on('chat', data => {
    socket.join(data.room);
    io.to(data.room).emit('chat', {
      messages: {
        user: data.user,
        type: data.type,
        message: data.message
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
