// vanilla/client/js/app.js

const app = {
  initialize: () => {
    if (!! window.EventSource) {
      document.getElementById('app').innerHTML = '<p>Your browser supports <tt>EventSource</tt>!</p>';

      const eventSource = new EventSource('http://localhost:5000/todo');

      eventSource.addEventListener('message', (e) => {
        document.getElementById('app').innerHTML += `<p>${e.data}</p>`
      }), false;

      eventSource.addEventListener('error', (e) => {
        console.log('got an error');
        console.log(e);
      }, false);
    } else {
      // TODO update app id div to say browser does not support EventSource...
      document.getElementById('app').innerHTML = '<p>Sorry, your browser does not support <tt>EventSource</tt> which is required for this demo.</p>';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  app.initialize();
});