import React from 'react';
import { Howl } from 'howler';
import Slider from './Slider.jsx';

const playSound = (path) => {
  const sound = new Howl({
    src: './assets/sounds/' + path,
    loop: true
  });
  sound.play();
  console.log('Playing sound', path);
}

class Channel extends React.Component {

  constructor(props) {
    const DEFAULT_VOLUME = 80;

    super(props);
    this.state = { volume: props.volume || DEFAULT_VOLUME };

    playSound(props.sound);
  }

  render() {
    return (
      <Slider position={this.state.volume} />
    );
  }

}

export default Channel;
