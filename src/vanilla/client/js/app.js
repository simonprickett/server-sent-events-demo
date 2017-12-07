// vanilla/client/js/app.js

const app = {
  initialize: () => {
    if (!! window.EventSource) {
      document.getElementById('browserSupport').innerHTML = '<p>This browser supports <tt>EventSource</tt>!</p>';

      const eventSource = new EventSource('http://localhost:5000/randomNamedEvents');

      eventSource.addEventListener('coinToss', (e) => {
        document.getElementById('coinToss').innerHTML = `<p>${e.data}</p>`;
      });

      eventSource.addEventListener('dieRoll', (e) => {
        document.getElementById('dieRoll').innerHTML = `<p>${e.data}</p>`;
      });

      eventSource.addEventListener('catFact', (e) => {
        document.getElementById('catFact').innerHTML = `<p>${e.data}</p>`;
      });

      eventSource.addEventListener('meme', (e) => {
        document.getElementById('meme').innerHTML = `<img src="${e.data}">`;
      });

      eventSource.addEventListener('error', (e) => {
        console.log('got an error');
        console.log(e);
      }, false);
    } else {
      // TODO update app id div to say browser does not support EventSource...
      document.getElementById('browserSupport').innerHTML = '<p>Sorry, your browser does not support <tt>EventSource</tt> which is required for this demo.</p>';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  app.initialize();
});