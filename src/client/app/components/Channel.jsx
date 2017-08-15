import React from 'react';
import PropTypes from 'prop-types';
import { Howl } from 'howler';
import Slider from 'components/Slider';
import LoopButton from 'components/LoopButton';
import SoundSwap from 'components/SoundSwap';

const DEFAULT_VOLUME = 0.8;
const LOOP_AUTORESTART = true;

const playSound = (path, volume = DEFAULT_VOLUME) => {
  const sound = new Howl({
    src: './assets/sounds/' + path,
    volume: volume,
    loop: true
  });
  sound.play();
  console.log('Playing:', path);
  return sound;
}

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

    this.onVolumeChange = this.onVolumeChange.bind(this);
    this.onSoundChange = this.onSoundChange.bind(this);
    this.toogleLoop = this.toogleLoop.bind(this);
  }

  onSoundChange(event) {
    const path = event.target.value;
    this.state.sound.unload();
    this.setState({
      path,
      sound: playSound(path, this.state.volume)
    });
  }

  onVolumeChange(volume) {
    this.state.sound.volume(volume);
    this.setState({ volume });
  }

  toogleLoop() {
    const sound = this.state.sound;
    sound.loop(!sound.loop());
    console.log('Looping:', sound.loop());
    if (sound.loop() && !sound.playing() && LOOP_AUTORESTART) sound.play();
  }

  onSoundSwap(channel) {
    return this.props.onSoundSwap(channel)
  }

  render() {
    const style = {
      backgroundColor: this.props.inSwap ? '#ffe0b2' : 'white'
    }
    return (
      <div className="channel" style={style}>
        <Slider position={this.state.volume} onChange={this.onVolumeChange} />
        <LoopButton onClick={this.toogleLoop} />
        <SoundSwap active={this.props.inSwap} onClick={this.onSoundSwap(this)} />
      </div>
    );
  }

}

Channel.propTypes = {
  id: PropTypes.number.isRequired,
  sound: PropTypes.string.isRequired,
  volume: PropTypes.number,
  onSoundSwap: PropTypes.func.isRequired
}

export default Channel;
