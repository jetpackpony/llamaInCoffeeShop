const GRAVITY = -5000;

const GROUND_SPEED = -300;
const JUMP_VELOCITY_Y = 1500;

const WORLD_HEIGHT = 500;
const GROUND_HEIGHT = 100;
const GROUND_TILE_WIDTH = 100;

const PLAYER_HEIGHT = 100;
const PLAYER_POSITION_X = 50;

const OBSTACLE_WIDTH = 50;

export default {
  assets: {
    canvas: null,
    sceneWidth: 700,
    sceneHeight: 400,
    images: {},
    scale: 1,
    dpr: 1
  },
  metrics: {
    frameRate: 0,
    frameCounter: 0,
    lastFrameRateTime: 0
  },
  world: {
    gravity: GRAVITY,
    width: 0,
    height: WORLD_HEIGHT,
    groundHeight: GROUND_HEIGHT,
    groundOffset: 30,
    worldSpeed: GROUND_SPEED,
    jumpVelocity: { x: 0, y: JUMP_VELOCITY_Y },
    objects: [
      {
        id: 'player',
        body: {
          acceleration: { x: 0, y: GRAVITY },
          velocity: { x: 0, y: 0 },
          position: { x: PLAYER_POSITION_X, y: WORLD_HEIGHT },
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
      },
      /*
      {
        id: `obstacle-${timestamp}`,
        generated: timestamp,
        type: 'obstacle',
        body: {
          acceleration: { x: 0, y: 0 },
          velocity: { x: worldSpeed, y: 0 },
          position: { x: worldWidth + 1, y: groundHeight },
          lastTick: timestamp
        }
      }
      {
        id: `collectable-${timestamp}`,
        generated: timestamp,
        type: 'collectable',
        body: {
          acceleration: { x: 0, y: 0 },
          velocity: { x: worldSpeed, y: 0 },
          position: { x: worldWidth + 1, y: groundHeight },
          lastTick: timestamp
        }
      }
      */
    ],
    ground: {
      tileWidth: GROUND_TILE_WIDTH,
      tileHeight: GROUND_HEIGHT
    },
    player: {
      height: PLAYER_HEIGHT
    },
    obstacle: {
      obstacleWidth: OBSTACLE_WIDTH
    },
    collectable: {
      collectableWidth: OBSTACLE_WIDTH
    }
  }
};
