// vanilla/client/js/app.js

const app = {
  updateEventsReceived: (event) => {
    const eventLog = document.getElementById('eventLog');

    eventLog.insertAdjacentHTML('afterbegin', `<br>${event.lastEventId}: (${event.type}) ${event.data}`);
  },

  initialize: () => {
    if (!! window.EventSource) {
      document.getElementById('browserSupport').innerHTML = 'This browser supports <tt>EventSource</tt>!';

      const eventSource = new EventSource('http://localhost:5000/randomNamedEvents');

      eventSource.onmessage = (e) => {
        console.log(e);
        if (e.lastEventId === '-1') {
          eventSource.close();
          document.getElementById('eventLog').insertAdjacentHTML('afterbegin', '<br>End of event stream from server.');
        }
      };

      eventSource.addEventListener('coinToss', (e) => {
        console.log(e);
        document.getElementById('coinToss').innerHTML = `${e.data}`;
        app.updateEventsReceived(e);
      });

      eventSource.addEventListener('dieRoll', (e) => {
        console.log(e);
        document.getElementById('dieRoll').innerHTML = `${e.data}`;
        app.updateEventsReceived(e);
      });

      eventSource.addEventListener('catFact', (e) => {
        document.getElementById('catFact').innerHTML = `${e.data}`;
        app.updateEventsReceived(e);
      });

      eventSource.addEventListener('meme', (e) => {
        console.log(e);
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