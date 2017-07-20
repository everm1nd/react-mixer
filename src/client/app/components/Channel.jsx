import React from 'react';
import { Howl } from 'howler';
import Slider from './Slider.jsx';

const DEFAULT_VOLUME = 80;

const playSound = (path, volume = DEFAULT_VOLUME) => {
  const sound = new Howl({
    src: './assets/sounds/' + path,
    volume: volume / 100,
    loop: true
  });
  sound.play();
  console.log('Playing sound', path);
  return sound;
}

const onChange = (sound) => (volume) => {
  sound.volume(volume);
};

class Channel extends React.Component {

  constructor(props) {
    super(props);
    const volume = props.volume || DEFAULT_VOLUME;
    this.state = {
      volume: volume,
      sound: playSound(props.sound, volume)
    };
  }

  render() {
    return (
      <Slider position={this.state.volume} onChange={onChange(this.state.sound)} />
    );
  }

}

export default Channel;
