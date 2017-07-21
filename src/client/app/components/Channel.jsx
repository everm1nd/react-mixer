import React from 'react';
import { Howl } from 'howler';
import Slider from './Slider.jsx';
import SoundSelector from './SoundSelector.jsx';
import LoopButton from './LoopButton.jsx';

const DEFAULT_VOLUME = 80;
const LOOP_AUTORESTART = true;

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
    this.toogleLoop = this.toogleLoop.bind(this);
  }

  onSoundChange(event) {
    const path = event.target.value;
    console.log(path);
    this.setState({ path });
    this.state.sound.unload();
    this.state.sound = playSound(path, this.state.volume);
  }

  toogleLoop() {
    const sound = this.state.sound;
    sound.loop(!sound.loop());
    console.log('Looping:', sound.loop());
    if (sound.loop() && !sound.playing() && LOOP_AUTORESTART) sound.play();
  }

  render() {
    return (
      <div className="channel">
        <Slider position={this.state.volume} onChange={onVolumeChange(this.state.sound)} />
        <LoopButton onClick={this.toogleLoop} />
        <SoundSelector sound={this.state.path} onSoundChange={this.onSoundChange} />
      </div>
    );
  }

}

export default Channel;
