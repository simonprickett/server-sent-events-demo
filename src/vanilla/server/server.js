// server/server.js

const http = require('http');
const PORT = process.env.PORT || 5000;

const catFacts = [
  'On average, cats spend 2/3 of every day sleeping.',
  'Unlike dogs, cats do not have a sweet tooth.',
  'When a cat chases its prey, it keeps its head level.',
  'The technical term for a cat\'s hairball is a bezoar.',
  'A group of cats is called a clowder.',
  'Cats make about 100 different sounds.',
  'There are over 500 million domestic cats globally.',
  'Cats are the most popular pet in North America.',
  'A cat\'s hearing is better than a dog\'s.',
  'Researchers are unsure exactly how a cat purrs.',
  'The biggest wildcat today is the Siberian Tiger.',
  'The smallest wildcat today is the Black-footed cat.',
  'A cat\'s sight is both better and worse than humans.',
  'Cats have 32 muscles that control the outer ear.'
];

const memes = [
  'https://imgflip.com/s/meme/Creepy-Condescending-Wonka.jpg',
  'https://imgflip.com/s/meme/Doge.jpg',
  'https://imgflip.com/s/meme/Philosoraptor.jpg',
  'https://imgflip.com/s/meme/Conspiracy-Keanu.jpg',
  'https://imgflip.com/s/meme/Table-Flip-Guy.jpg'
];

function getRandomIndex(low, high) {
  const min = Math.ceil(low);
  const max = Math.floor(high);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomCatFactMessage() {
  console.log('Sending cat fact message.');
  return (`event: catFact\ndata:${catFacts[getRandomIndex(0, catFacts.length - 1)]}\n\n\n`);
}

function createCoinTossMessage() {
  console.log('Sending coin toss message.');
  return (`event: coinToss\ndata:${getRandomIndex(0, 1) ? 'Heads' : 'Tails'}\n\n\n`);
}

function createDieRollMessage() {
  console.log('Sending die roll message.');
  return (`event: dieRoll\ndata:${getRandomIndex(1, 6)}\n\n\n`);
}

function createRandomMemeMessage() {
  console.log('Sending meme message.');
  return (`event: meme\ndata:${memes[getRandomIndex(0, memes.length - 1)]}\n\n\n`);
}

function createRandomNamedEvents(request, response) {
  response.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  });

  let eventsSent = 1;

  const interval = setInterval(() => {
    if (eventsSent === 31) {
      clearInterval(interval);
      console.log('Sent 30 events, stopping.');
      response.write('id: -1\ndata:\n\n\n');
      response.end();
      return;
    }

    response.write(`id: ${eventsSent < 10 ? '0' : ''}${eventsSent}\n`);

    const msgType = getRandomIndex(0, 3);

    switch (msgType) {
      case 0:
        response.write(createCoinTossMessage());
        eventsSent += 1;
        break;
      case 1:
        response.write(createDieRollMessage());
        eventsSent += 1;
        break;
      case 2:
        response.write(createRandomCatFactMessage()); 
        eventsSent += 1;   
        break;
      case 3:
        response.write(createRandomMemeMessage());
        eventsSent += 1;
        break;
    }
  }, 3000);

  request.on('close', () => {
    clearInterval(interval);
    response.end();
    console.log('Stopped sending events as client closed the connection.');
  });
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
    case '/randomNamedEvents':
      createRandomNamedEvents(request, response);
      break;
    default:
      // Unknown URL
      response.writeHead(404);
      response.end();
  }
}).listen(PORT);

console.log(`server-sent-events-demo server running on port ${PORT}`);
