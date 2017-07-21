import React from 'react';
import PropTypes from 'prop-types';

const SoundSelector = (props) => {
  return(<select className="sound-selector" value={props.sound} onChange={props.onSoundChange}>
    <option value="birds.wav">Brids</option>
    <option value="rain.wav">Rain</option>
  </select>);
}

SoundSelector.propTypes = {
  sound: PropTypes.string.isRequired,
  onSoundChange: PropTypes.func.isRequired
}

export default SoundSelector;
