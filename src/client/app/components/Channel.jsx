import React from 'react';
import PropTypes from 'prop-types';
import { Howl } from 'howler';
import Slider from 'components/Slider';
import LoopButton from 'components/LoopButton';
import SoundSwap from 'components/SoundSwap';

const DEFAULT_VOLUME = 0.8;
const LOOP_AUTORESTART = true;

const playSound = (sound, volume = DEFAULT_VOLUME) => {
  const player = new Howl({
    src: './assets/sounds/' + sound.path,
    volume: volume,
    loop: true
  });
  player.play();
  console.log('Playing:', sound.path);
  return player;
}

class Channel extends React.Component {

  constructor(props) {
    super(props);
    const volume = props.volume || DEFAULT_VOLUME;
    this.state = {
      volume: volume,
      sound: props.sound,
      player: playSound(props.sound, volume)
    };

    this.onVolumeChange = this.onVolumeChange.bind(this);
    this.toogleLoop = this.toogleLoop.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const sound = nextProps.sound
    if (this.state.sound.path != sound.path) {
      this.state.player.unload();
      this.setState({
        sound,
        player: playSound(sound, this.state.volume)
      });
    }
  }

  onVolumeChange(volume) {
    this.state.player.volume(volume);
    this.setState({ volume });
  }

  toogleLoop() {
    const player = this.state.player;
    player.loop(!player.loop());
    console.log('Looping:', player.loop());
    if (player.loop() && !player.playing() && LOOP_AUTORESTART) player.play();
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
        <div className="buttons">
          <LoopButton onClick={this.toogleLoop} />
          <SoundSwap active={this.props.inSwap} onClick={this.onSoundSwap(this)} />
        </div>
        <div className="sound-name">{this.state.sound.name}</div>
      </div>
    );
  }

}

Channel.propTypes = {
  id: PropTypes.number.isRequired,
  sound: PropTypes.object.isRequired,
  volume: PropTypes.number,
  onSoundSwap: PropTypes.func.isRequired
}

export default Channel;
