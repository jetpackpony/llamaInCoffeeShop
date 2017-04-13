import createGame from './createGame';

var app = {
    initialize: function() {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      );
      const Game = createGame(document.querySelector('#root canvas'));
      Game.start();
    },

    onDeviceReady: function() {
    }
};

app.initialize();
