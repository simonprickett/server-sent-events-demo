// vanilla/client/js/app.js

const app = {
  initialize: () => {
    if (!! window.EventSource) {
      document.getElementById('browserSupport').innerHTML = 'This browser supports <tt>EventSource</tt>!';

      const eventSource = new EventSource('http://localhost:5000/randomNamedEvents');

      eventSource.addEventListener('coinToss', (e) => {
        document.getElementById('coinToss').innerHTML = `${e.data}`;
      });

      eventSource.addEventListener('dieRoll', (e) => {
        document.getElementById('dieRoll').innerHTML = `${e.data}`;
      });

      eventSource.addEventListener('catFact', (e) => {
        document.getElementById('catFact').innerHTML = `${e.data}`;
      });

      eventSource.addEventListener('meme', (e) => {
        document.getElementById('meme').innerHTML = `<img class="memeImage" src="${e.data}">`;
      });

      eventSource.addEventListener('error', (e) => {
        console.log('got an error');
        console.log(e);
      });
    } else {
      // TODO update app id div to say browser does not support EventSource...
      // TODO update div to have additional class 'unsupportedBrowser
      document.getElementById('browserSupport').innerHTML = 'Sorry, your browser does not support <tt>EventSource</tt> which is required for this demo.';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  app.initialize();
});