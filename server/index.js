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
  socket.on('login', user => {
    // socket.join('main');
    // console.log(Object.keys(io.sockets.adapter.rooms['main'].sockets));
    // io.clients((error, clients) => {
    //   if (error) throw error;
    //   console.log(clients);
    // });
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
  });

  socket.on('disconnect', () => {});
  // socket.on('list', user => {
  //   io.emit('list', {
  //     ...user
  //   });
  // });
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
