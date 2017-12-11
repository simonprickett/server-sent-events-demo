// vanilla/client/js/app.js

const app = {
  eventsReceived : 0,

  updateEventsReceived: (event) => {
    const eventLog = document.getElementById('eventLog');

    app.eventsReceived++;
    eventLog.innerHTML = `${eventLog.innerHTML}<br/>${app.eventsReceived}: (${event.type}) ${event.data}`;
  },

  initialize: () => {
    if (!! window.EventSource) {
      document.getElementById('browserSupport').innerHTML = 'This browser supports <tt>EventSource</tt>!';

      const eventSource = new EventSource('http://localhost:5000/randomNamedEvents');
      app.eventsReceived = 0;

      eventSource.addEventListener('coinToss', (e) => {
        document.getElementById('coinToss').innerHTML = `${e.data}`;
        app.updateEventsReceived(e);
      });

      eventSource.addEventListener('dieRoll', (e) => {
        document.getElementById('dieRoll').innerHTML = `${e.data}`;
        app.updateEventsReceived(e);
      });

      eventSource.addEventListener('catFact', (e) => {
        document.getElementById('catFact').innerHTML = `${e.data}`;
        app.updateEventsReceived(e);
      });

      eventSource.addEventListener('meme', (e) => {
        document.getElementById('meme').innerHTML = `<img class="memeImage" src="${e.data}">`;
        app.updateEventsReceived(e);
      });

      eventSource.addEventListener('error', (e) => {
        console.log('got an error');
        console.log(e);
      });
    } else {
      // TODO update div to have additional class 'unsupportedBrowser
      document.getElementById('browserSupport').innerHTML = 'Sorry, your browser does not support <tt>EventSource</tt> which is required for this demo.';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  app.initialize();
});