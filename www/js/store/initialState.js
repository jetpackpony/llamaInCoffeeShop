import * as CONST from '../constants';

export default function getInitialState() {
  return {
    assets: {
      sceneWidth: 700,
      sceneHeight: 400,
      images: {},
      scale: 1,
      dpr: 1
    },

    world: {
      gameState: 'playing',
      score: {
        coffees: 0,
        tables: 0,
        energy: 100,
        steps: 0
      },
      timestamp: 0,
      minSpread: CONST.MIN_OBSTACLE_SPREAD,
      maxSpread: CONST.MAX_OBSTACLE_SPREAD,
      minCollectableSpread: CONST.MIN_COLLECTABLE_SPREAD,
      maxCollectableSpread: CONST.MAX_COLLECTABLE_SPREAD,
      minSpeed: CONST.MIN_GROUND_SPEED,
      maxSpeed: CONST.MAX_GROUND_SPEED,
      width: 0,
      height: CONST.WORLD_HEIGHT,
      groundHeight: CONST.GROUND_HEIGHT,
      groundOffset: 30,
      worldSpeed: CONST.MIN_GROUND_SPEED,
      jumpVelocity: { x: 0, y: CONST.JUMP_VELOCITY_Y },
      newCollisions: [],

      player: {
        body: {
          acceleration: { x: 0, y: CONST.GRAVITY },
          velocity: { x: 0, y: 0 },
          position: { x: CONST.PLAYER_POSITION_X, y: CONST.WORLD_HEIGHT },
          lastTick: 0
        },
        height: CONST.PLAYER_WIDTH,
        width: CONST.PLAYER_WIDTH
      },
      ground: {
        body: {
          acceleration: { x: 0, y: 0 },
          velocity: { x: CONST.MIN_GROUND_SPEED, y: 0 },
          position: { x: 0, y: CONST.GROUND_HEIGHT },
          lastTick: 0,
          prevPositionX: 0
        },
        tileWidth: CONST.GROUND_TILE_WIDTH,
        tileHeight: CONST.GROUND_HEIGHT,
      },
      objects: [
        /*
      {
        id: `obstacle-${timestamp}`,
        type: 'obstacle',
        view: 'table',
        colliding: false
        body: {
          position: { x: worldWidth + 1, y: groundHeight },
          lastTick: timestamp
        }
      }
      {
        id: `collectable-${timestamp}`,
        type: 'collectable',
        view: 'coffee',
        colliding: false,
        body: {
          position: { x: worldWidth + 1, y: groundHeight },
          lastTick: timestamp
        }
      }
      */
      ],
      obstacle: {
        height: CONST.OBSTACLE_WIDTH,
        width: CONST.OBSTACLE_WIDTH
      },
      collectable: {
        height: CONST.OBSTACLE_WIDTH,
        width: CONST.OBSTACLE_WIDTH
      }
    }
  };
};
