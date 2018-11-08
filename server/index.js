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

mobxReact.useStaticRendering(true);

io.on('connection', socket => {
  // 접속한 클라이언트의 정보가 수신되면
  socket.on('login', data => {
    console.log(data.id);

    socket.id = data.id;

    // 접속된 모든 클라이언트에게 메시지를 전송한다
    io.emit('login', data.id);
  });
  // const clientIp = socket.request.connection.remoteAddress;

  // socket.on('SEND_MESSAGE', data => {
  //   io.emit('RECEIVE_MESSAGE', {
  //     ...data
  //     // clientIp
  //   });
  // });
});

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
