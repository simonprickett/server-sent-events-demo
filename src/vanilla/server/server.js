// server/server.js

const http = require('http');
const PORT = process.env.PORT || 5000;

const catFacts = [
  'Every year, nearly four million cats are eaten in Asia.',
  'On average, cats spend 2/3 of every day sleeping.',
  'Unlike dogs, cats do not have a sweet tooth.',
  'When a cat chases its prey, it keeps its head level.',
  'The technical term for a cat\'s hairball is a bezoar.',
  'A group of cats is called a clowder.',
  'Female cats tend to be right pawed, while male cats are more often left pawed.',
  'A cat cannot climb head first down a tree because its claws are curved the wrong way.',
  'Cats make about 100 different sounds.',
  'A cat\'s brain is biologically more similar to a human brain than it is to a dog\'s.',
  'There are more than 500 million domestic cats in the world.',
  'Approximately 24 cat skins can make a coat.',
  'During the Middle Ages, cats were associated with witchcraft.',
  'Cats are the most popular pet in North America.',
  'Approximately 40,000 people are bitten by cats in the USA each year.'
];

// Get more from https://imgflip.com/memetemplates
const memes = [
  'https://imgflip.com/s/meme/Creepy-Condescending-Wonka.jpg',
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

function createRandomNamedEvents(response) {
  response.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  });

  setInterval(() => {
    const msgType = getRandomIndex(0, 3);

    console.log(`Chose message type ${msgType}`);

    switch (msgType) {
      case 0:
        response.write(createCoinTossMessage());
        break;
      case 1:
        response.write(createDieRollMessage());
        break;
      case 2:
        response.write(createRandomCatFactMessage());    
        break;
      case 3:
        response.write(createRandomMemeMessage());
        break;
      default:
        console.log(`Was expecting msgType 0..3, got ${messageType}!`);
    }
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
    case '/randomNamedEvents':
      createRandomNamedEvents(response);
      break;
    case '/todo2':
      break;
    default:
      // Unknown URL
      response.writeHead(404);
      response.end();
  }
}).listen(PORT);

console.log(`server-sent-events-demo server running on port ${PORT}`);
