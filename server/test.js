const express = require('express')();
const server = require('http').createServer(express);
const chatServer = require('./chat');
const port = parseInt(process.env.PORT, 10) || 3000;
chatServer(server);

server.listen(port, err => {
  if (err) {
    throw err;
  }
  console.log(`> Ready on port ${port}`);
});
