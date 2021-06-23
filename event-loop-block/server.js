const Hapi = require('@hapi/hapi');

const blockEventLoop = (blockIn = 0) => {
  setTimeout(() => {
    while (true) {}
  }, blockIn * 1000);
};

const initializeServer = async () => {
  const server = Hapi.server({
    port: 1234,
    host: 'localhost',
  });
  await server.start();
  console.log('Server running on port 3000');

  server.route({
    method: 'GET',
    path: '/block/{secs?}',
    handler: (req, h) => {
      const { secs } = req.params;
      blockEventLoop(secs || 0);

      return h.response({
        message: `Event Loop Blocked! Try to send request after ${secs} seconds and test`,
      });
    },
  });

  server.route({
    method: 'GET',
    path: '/hello',
    handler: (req, h) => {
      return 'Hello There';
    },
  });
};

initializeServer();
