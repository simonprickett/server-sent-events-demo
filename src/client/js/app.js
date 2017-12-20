// client/js/app.js

const app = {
  updateEventsReceived: (event) => {
    document.getElementById('eventLog').insertAdjacentHTML('afterbegin', `<br>${event.lastEventId}: (${event.type}) ${event.data}`);
  },

  resetStartButton: () => {
    document.getElementById('startEvents').value = 'Start Events';
  },

  startEvents: () => {
    app.eventSource = new EventSource('http://localhost:5000/randomNamedEvents');

    app.eventSource.onmessage = (e) => {
      console.log(e);
      if (e.lastEventId === '-1') {
        app.eventSource.close();
        document.getElementById('eventLog').insertAdjacentHTML('afterbegin', '<br>End of event stream from server.');
        app.resetStartButton();
      }
    };

    app.eventSource.addEventListener('coinToss', (e) => {
      console.log(e);
      document.getElementById('coinToss').innerHTML = `${e.data}`;
      app.updateEventsReceived(e);
    });

    app.eventSource.addEventListener('dieRoll', (e) => {
      console.log(e);
      document.getElementById('dieRoll').innerHTML = `${e.data}`;
      app.updateEventsReceived(e);
    });

    app.eventSource.addEventListener('catFact', (e) => {
      console.log(e);
      document.getElementById('catFact').innerHTML = `${e.data}`;
      app.updateEventsReceived(e);
    });

    app.eventSource.addEventListener('meme', (e) => {
      console.log(e);
      document.getElementById('meme').innerHTML = `<img class="memeImage" src="${e.data}">`;
      app.updateEventsReceived(e);
    });

    app.eventSource.addEventListener('error', (e) => {
      console.log('got an error');
      console.log(e);
      app.resetStartButton();
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const browserSupportElem = document.getElementById('browserSupport');

  if (!! window.EventSource) {
    browserSupportElem.innerHTML = 'This browser supports <tt>EventSource</tt>! <input type="submit" class="startEvents" id="startEvents" value="Start Events">';
    document.getElementById('startEvents').addEventListener('click', function(event) {
      if (this.value === 'Start Events') {
        this.value = 'Stop Events';
        app.startEvents();
      } else {
        app.eventSource.close();
        document.getElementById('eventLog').insertAdjacentHTML('afterbegin', '<br>Event stream closed by browser.');
        app.resetStartButton();
      }
    });
  } else {
    browserSupportElem.innerHTML = 'This browser does not support <tt>EventSource</tt> :(';
    browserSupportElem.classList.add('unsupportedBrowser');
  }
});