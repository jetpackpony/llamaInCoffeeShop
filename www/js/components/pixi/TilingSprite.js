import { CustomPIXIComponent } from 'react-pixi';
import * as PIXI from 'pixi.js';

const TilingSpriteComponentMixin = {
  customDisplayObject(props) {
    if (props.texture) {
      return new PIXI.extras.TilingSprite(props.texture, props.width, props.height);
    }
  },

  customApplyProps(displayObject, oldProps, newProps) {
    this.applyDisplayObjectProps(oldProps, newProps);
    this.transferDisplayObjectPropsByName(oldProps, newProps, {
      'tileScale' : 1,
      'tilePosition' : 0,
      'tileScaleOffset' : 1
    });
  },
  /*
  customDidAttach(displayObject) {
  },

  customWillDetach(displayObject) {
  }
  */
};

export default CustomPIXIComponent(TilingSpriteComponentMixin);
