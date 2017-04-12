import getTest from './getTest';

var app = {
    initialize: function() {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
      document.getElementById('test').innerText = getTest();
    },

    onDeviceReady: function() {
    }
};

app.initialize();
