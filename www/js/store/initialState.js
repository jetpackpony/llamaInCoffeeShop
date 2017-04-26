const GRAVITY = -5000;

const GROUND_SPEED = -800;
const JUMP_VELOCITY_Y = 2500;

const WORLD_HEIGHT = 1000;
const GROUND_HEIGHT = 200;
const GROUND_TILE_WIDTH = 100;

const PLAYER_WIDTH = 80;
const PLAYER_POSITION_X = 50;

const OBSTACLE_WIDTH = 70;

export default {
  collectableBonus: 5,
  obstacleDamage: -30,
  gameState: 'playing',
  assets: {
    canvas: null,
    sceneWidth: 700,
    sceneHeight: 400,
    images: {},
    scale: 1,
    dpr: 1
  },
  score: {
    coffees: 0,
    tables: 0,
    energy: 100
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
        view: 'table',
        collidingWithPlayer: false,
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
        view: 'coffee',
        collidingWithPlayer: false,
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
      height: PLAYER_WIDTH,
      width: PLAYER_WIDTH
    },
    obstacle: {
      height: OBSTACLE_WIDTH,
      width: OBSTACLE_WIDTH
    },
    collectable: {
      height: OBSTACLE_WIDTH,
      width: OBSTACLE_WIDTH
    }
  }
};
