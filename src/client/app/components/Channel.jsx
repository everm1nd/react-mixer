import React from 'react';
import { Howl } from 'howler';
import Slider from './Slider.jsx';

class Channel extends React.Component {

  constructor(props) {
    const DEFAULT_VOLUME = 80;

    super(props);
    this.state = { volume: props.volume || DEFAULT_VOLUME };

    const sound = new Howl({ src: './assets/sound.wav', buffer: true });
    sound.play();
  }

  render() {
    return (
      <Slider position={this.state.volume} />
    );
  }

}

export default Channel;
