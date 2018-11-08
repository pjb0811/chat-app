const express = require('express')();
const server = require('http').createServer(express);
const io = require('socket.io').listen(server);

// const proxyMiddleware = require('http-proxy-middleware');
const next = require('next');
// const mobxReact = require('mobx-react');

// const proxies = require('../lib/proxies');
const routes = require('../lib/routes');
const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV;
const dev = env !== 'production';
const app = next({
  dir: '.',
  dev
});

const routeHandler = routes.getRequestHandler(app);
// const handle = app.getRequestHandler();

// mobxReact.useStaticRendering(true);

io.on('connect', socket => {
  // const clientIp = socket.request.connection.remoteAddress;

  socket.on('SEND_MESSAGE', data => {
    io.emit('RECEIVE_MESSAGE', {
      ...data
      // clientIp
    });
  });
});

app
  .prepare()
  .then(() => {
    // if (proxies) {
    //   Object.keys(proxies).forEach(function(context) {
    //     express.use(context, proxyMiddleware(proxies[context]));
    //   });
    // }

    express.use(routeHandler);
    // express.all('*', (req, res) => handle(req, res));

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
