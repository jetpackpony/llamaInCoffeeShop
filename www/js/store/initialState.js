import {
  GRAVITY, GROUND_HEIGHT,
  GROUND_SPEED, WORLD_HEIGHT
} from '../constants';

export default {
  assets: {
    canvas: null,
    images: {},
    scale: 1,
    dpr: 1
  },
  world: {
    gravity: GRAVITY,
    width: 0,
    height: WORLD_HEIGHT,
    groundHeight: GROUND_HEIGHT,
    worldSpeed: GROUND_SPEED,
    jumpVelocity: { x: 0, y: 1500 },
    objects: [
      {
        id: 'player',
        body: {
          acceleration: { x: 0, y: GRAVITY },
          velocity: { x: 0, y: 0 },
          position: { x: 30, y: WORLD_HEIGHT },
          lastTick: 0
        }
      },
      {
        id: 'ground',
        body: {
          acceleration: { x: 0, y: 0 },
          velocity: { x: GROUND_SPEED, y: 0 },
          position: { x: 0, y: GROUND_HEIGHT },
          lastTick: 0
        }
      }
    ],
    ground: {
      tileWidth: 100,
      tileHeight: GROUND_HEIGHT
    },
    player: {
      height: 100
    }
  },
  metrics: {
    frameRate: 0,
    frameCounter: 0,
    lastFrameRateTime: 0
  },
  /*
  player: {
    inJump: false
  },
  ground: {
    tileWidth: 100,
  }
  ,
  obstacles: [
    {
      id: 'first',
      generated: 0,
      displayObject: {
        acceleration: { x: 0, y: GRAVITY },
        velocity: { x: WORLD_SPEED, y: 0 },
        coords: { x: 500, y: 100 },
        lastTick: 0
      }
    }
  ]
  */
};
