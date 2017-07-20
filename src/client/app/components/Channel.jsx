import React from 'react';
import { Howl } from 'howler';
import Slider from './Slider.jsx';

const playSound = (path) => {
  const sound = new Howl({ src: path, buffer: true });
  sound.play();
  console.log('Playing sound', path);
}

class Channel extends React.Component {

  constructor(props) {
    const DEFAULT_VOLUME = 80;

    super(props);
    this.state = { volume: props.volume || DEFAULT_VOLUME };

    playSound('./assets/sound.wav');
  }

  render() {
    return (
      <Slider position={this.state.volume} />
    );
  }

}

export default Channel;
