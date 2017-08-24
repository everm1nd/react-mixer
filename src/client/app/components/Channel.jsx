import React from "react"
import PropTypes from "prop-types"
import { Howl } from "howler"
import Slider from "components/Slider"
import LoopButton from "components/LoopButton"
import SoundSwap from "components/SoundSwap"
import DeleteChannel from "components/DeleteChannel"
import Sound from "models/Sound"

const DEFAULT_VOLUME = 0.8
const LOOP_AUTORESTART = true

const normalizeUrl = (url) => url.match(/^https?:\/\//) ? url : `./assets/sounds/${url}`

const playSound = (sound, volume = DEFAULT_VOLUME) => {
  const player = new Howl({
    src: normalizeUrl(sound.path),
    volume: volume,
    loop: true
  })
  player.play()
  console.log("Playing:", sound.path)
  return player
}

class Channel extends React.Component {
  constructor(props) {
    super(props)
    const volume = props.volume || DEFAULT_VOLUME
    this.state = {
      volume: volume,
      sound: props.sound,
      player: playSound(props.sound, volume)
    }

    this.handleVolumeChange = this.handleVolumeChange.bind(this)
    this.handleToogleLoop = this.handleToogleLoop.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const sound = nextProps.sound
    if (this.state.sound.path != sound.path) {
      this.state.player.unload()
      this.setState({
        sound,
        player: playSound(sound, this.state.volume)
      })
    }
  }

  componentWillUnmount() {
    this.state.player.unload()
  }

  handleVolumeChange(volume) {
    this.state.player.volume(volume)
    this.setState({ volume })
  }

  handleToogleLoop() {
    const player = this.state.player
    player.loop(!player.loop())
    console.log("Looping:", player.loop())
    if (player.loop() && !player.playing() && LOOP_AUTORESTART) player.play()
  }

  onSoundSwap(channel) {
    return this.props.onSoundSwap(channel)
  }

  render() {
    const style = {
      backgroundColor: this.props.inSwap ? "#ffe0b2" : "white"
    }
    return (
      <div
          className="channel"
          style={style}
      >
        <Slider
            onChange={this.handleVolumeChange}
            position={this.state.volume}
        />
        <div className="buttons">
          <LoopButton onClick={this.handleToogleLoop} />
          <SoundSwap
              active={this.props.inSwap}
              onClick={this.onSoundSwap(this)}
          />
          <DeleteChannel onClick={this.props.onDelete(this)} />
        </div>
        <div className="sound-name">{this.state.sound.name}</div>
      </div>
    )
  }
}

Channel.defaultProps = {
  inSwap: false,
  volume: 0.8,
}

Channel.propTypes = {
  id: PropTypes.number.isRequired,
  inSwap: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onSoundSwap: PropTypes.func.isRequired,
  sound: PropTypes.instanceOf(Sound).isRequired,
  volume: PropTypes.number
}

export default Channel
