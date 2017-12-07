// server/server.js

const http = require('http');
const PORT = process.env.PORT || 5000;

function createServerSentEvent(response) {
  response.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  });

  setInterval(() => {
    response.write('data: TODO\n');
    response.write('\n\n');
    console.log('Sent message...');
  }, 3000);
}

http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.setHeader('Access-Control-Allow-Headers', '*');

  if (request.method === 'OPTIONS') {
    response.writeHead(200);
    response.end();
    return;
  }

  switch (request.url) {
    case '/todo':
      createServerSentEvent(response);
      break;
    default:
      // Unknown URL
      response.writeHead(404);
      response.end();
  }
}).listen(PORT);

console.log(`server-sent-events-demo server running on port ${PORT}`);
