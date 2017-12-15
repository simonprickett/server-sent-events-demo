# Server Sent Events Demo

A small Server Sent Events demo for [San Diego JS](http://sandiegojs.org/) Meetup using Node, HTML, JavaScript, CSS.

![demo](sse_demo.gif)

## TODO

* Add a start/stop button for the events to the client
* Stop the client immediately requesting events on page load
* Produce slides
* Produce a version that uses frameworks

## Running this Project

The following instructions assume Mac OS / Linux system with Python installed (to provide a simple web server).

### Start the Server in a Terminal Window

```
cd src/vanilla/server
npm install
npm start
```

### Start the Client in another Terminal Window

```
cd src/vanilla/client
python -m SimpleHTTPServer
```

Then point a browser at `http://localhost:8000/`.

## Reference Materials

* [MDN Server Sent Events Guide](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
* [HTML 5 Rocks Tutorial](https://www.html5rocks.com/en/tutorials/eventsource/basics/)
* [O'Reilyl High Performance Browser Networking SSE page](https://hpbn.co/server-sent-events-sse/)
* [Data source for cat facts](https://github.com/vadimdemedes/cat-facts)