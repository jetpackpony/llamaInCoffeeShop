import createGame from './createGame';

var app = {
  initialize: function() {
    document.addEventListener('deviceready', () => { }, false);

    const canvas = document.querySelector('#root canvas');
    this.resizeCanvas(canvas);
    createGame(canvas).then((game) => {

      // Add event listener for resize
      window.addEventListener('resize', () => {
        this.resizeCanvas(canvas);
        game.resize(window.devicePixelRatio);
      }, false);

      canvas.addEventListener('touchstart', (event) => {
        event.preventDefault();
        game.touch();
      }, false);

      // Start the game
      game.resize(window.devicePixelRatio);
      game.start();
    });
  },

  resizeCanvas: function resizeCanvas(canvas ) {
    const dpr = window.devicePixelRatio;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }
};

app.initialize();
