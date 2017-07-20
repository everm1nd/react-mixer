import React from 'react';
import { Howl } from 'howler';
import Slider from './Slider.jsx';
import SoundSelector from './SoundSelector.jsx';

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

const onVolumeChange = (sound) => (volume) => {
  sound.volume(volume);
};

class Channel extends React.Component {

  constructor(props) {
    super(props);
    const volume = props.volume || DEFAULT_VOLUME;
    const path = props.sound;
    this.state = {
      volume: volume,
      path: path,
      sound: playSound(props.sound, volume)
    };

    this.onSoundChange = this.onSoundChange.bind(this);
  }

  onSoundChange(event) {
    const path = event.target.value;
    console.log(path);
    this.setState({ path });
    this.state.sound.unload();
    this.state.sound = playSound(path, this.state.volume);
  }

  render() {
    return (
      <div>
        <Slider position={this.state.volume} onChange={onVolumeChange(this.state.sound)} />
        <SoundSelector sound={this.state.path} onSoundChange={this.onSoundChange} />
      </div>
    );
  }

}

export default Channel;
