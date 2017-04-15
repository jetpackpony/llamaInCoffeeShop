import createGame from './createGame';

var app = {
  initialize: function() {
    document.addEventListener('deviceready', () => { }, false);

    const canvas = document.querySelector('#root canvas');
    window.addEventListener('resize', () => {
      this.resizeCanvas(canvas);
    }, false);

    this.resizeCanvas(canvas);
    createGame(canvas)
      .then((game) => game.start());
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
