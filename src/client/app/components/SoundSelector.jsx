import React from 'react';

const SoundSelector = (props) => {
  return(<select className="sound-selector" value={props.sound} onChange={props.onSoundChange}>
    <option value="birds.wav">Brids</option>
    <option value="rain.wav">Rain</option>
  </select>);
}

export default SoundSelector;
