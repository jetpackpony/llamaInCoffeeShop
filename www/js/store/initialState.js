const GRAVITY = -5000;

const MIN_GROUND_SPEED = -800;
const MAX_GROUND_SPEED = -3000;
const GROUND_ACCELERATION = 300;
const JUMP_VELOCITY_Y = 1200;

const WORLD_HEIGHT = 500;
const GROUND_HEIGHT = 150;
const GROUND_TILE_WIDTH = 100;

const PLAYER_WIDTH = 60;
const PLAYER_POSITION_X = 50;

const OBSTACLE_WIDTH = 50;

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
    minSpread: 700,
    maxSpread: 1500,
    minSpeed: MIN_GROUND_SPEED,
    maxSpeed: MAX_GROUND_SPEED,
    groundAcceleration: GROUND_ACCELERATION,
    obstacleProbability: 0.5,
    gravity: GRAVITY,
    width: 0,
    height: WORLD_HEIGHT,
    groundHeight: GROUND_HEIGHT,
    groundOffset: 30,
    worldSpeed: MIN_GROUND_SPEED,
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
          velocity: { x: MIN_GROUND_SPEED, y: 0 },
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
