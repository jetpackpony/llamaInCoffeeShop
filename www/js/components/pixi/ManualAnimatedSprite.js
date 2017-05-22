import React from 'react';
import { DisplayObjectContainer, Sprite } from 'react-pixi';

export default ({ textures, currentFrame, visible }) => {
  const sprites = textures.map((texture, i) => (
    <Sprite
      key={i}
      texture={texture}
      visible={i === currentFrame}
    />
  ));
  return (
    <DisplayObjectContainer visible={visible}>
      {sprites}
    </DisplayObjectContainer>
  );
};
