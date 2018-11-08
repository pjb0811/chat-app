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
// let clients = [];
let clients = io.sockets.clients().connected;

io.on('connection', socket => {
  socket.on('login', data => {
    socket.userId = data.userId;

    // clients.push({
    //   userId: data.userId,
    //   socketId: socket.id
    // });
    console.log(clients);

    io.to(socket.id).emit('login', {
      ...data,
      socketId: socket.id
      // clients
    });
  });

  socket.on('logout', data => {
    // clients.splice(clients.indexOf(socket.id), 1);
    // io.emit('logout', { socketId: socket.id, clients });
  });

  // socket.on('list', data => {
  //   io.emit('list', {
  //     ...data
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
