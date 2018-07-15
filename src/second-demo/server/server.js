const http = require('http');
const PORT = process.env.PORT || 5000;

const subscribers = {};

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

function getRandomIndex(low, high) {
  const min = Math.ceil(low);
  const max = Math.floor(high);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomCatFactMessage() {
  console.log('Sending cat fact message.');
  return (`event: catFact\ndata:${catFacts[getRandomIndex(0, catFacts.length - 1)]}\n\n\n`);
}

function subscribeToEvents(request, response) {
  // Get a key for this subscriber.
  const subscriberKey = Date.now();

  // Tell response what we will send, and to stay alive.
  response.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  });

  // If the client closes connection, close the response.
  request.on('close', () => {
    response.end();

    // Also remove this subscriber from further updates.
    delete(subscribers[subscriberKey]);

    console.log(`Client closed connection for subscriberKey ${subscriberKey}.`);
  });

  // Add this request, response pair to subscribers.
  subscribers[subscriberKey] = {
    request,
    response
  };

  console.log(`Added subscriber ${subscriberKey}.`);
}

function generateEvent(request, response) {
  // Generate a new random cat fact.
  const randomCatFactEvent = createRandomCatFactMessage();

  // Loop around subscribers and send each a server sent event.
  for (const subscriberKey in subscribers) {
    subscribers[subscriberKey].response.write(randomCatFactEvent); 
    console.log(`Sent random cat fact to subscriber ${subscriberKey}.`);
  }

  // Tell the caller that we completed the request.
  response.write('ok');
  response.end();
  return;
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
    case '/subscribeToEvents':
      subscribeToEvents(request, response);
      break;
    case '/generateEvent':
      generateEvent(request, response);
      break;
    default:
      // Unknown URL
      response.writeHead(404);
      response.end();
  }
}).listen(PORT);

console.log(`server-sent-events-demo server running on port ${PORT}`);