import { CustomPIXIComponent } from 'react-pixi';
import * as PIXI from 'pixi.js';

const AnimatedSpriteComponentMixin = {
  customDisplayObject(props) {
    if (props.textures) {
      return new PIXI.extras.AnimatedSprite(props.textures);
    }
  },

  customApplyProps(displayObject, oldProps, newProps) {
    this.applyDisplayObjectProps(oldProps, newProps);
    this.transferDisplayObjectPropsByName(oldProps, newProps, {
      'animationSpeed': 0,
      'textures': [],
      'loop': true
    });

    if (newProps.playing) {
      displayObject.play();
    } else {
      displayObject.stop();
    }
  },
  /*
  customDidAttach(displayObject) {
  },

  customWillDetach(displayObject) {
  }
  */
};

export default CustomPIXIComponent(AnimatedSpriteComponentMixin);
