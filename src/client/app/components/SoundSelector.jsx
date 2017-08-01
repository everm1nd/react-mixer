import React from 'react';
import PropTypes from 'prop-types';

import Sound from '../models/Sound';

const soundOptions = Sound.search().map((sound) =>
  <option value={sound.path}>{sound.name}</option>
);

const SoundSelector = (props) => {
  return(<select className="sound-selector" value={props.sound} onChange={props.onSoundChange}>
    {soundOptions}
  </select>);
}

SoundSelector.propTypes = {
  sound: PropTypes.string.isRequired,
  onSoundChange: PropTypes.func.isRequired
}

export default SoundSelector;
