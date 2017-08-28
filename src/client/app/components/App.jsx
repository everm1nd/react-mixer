import React from "react"
import classNames from "classnames"
import Channel from "components/Channel"
import SearchField from "components/SearchField"
import SearchResults from "components/SearchResults"
import Sound from "models/Sound"
import AddChannel from "components/AddChannel"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sounds: Sound.all(),
      foundSounds: []
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSoundSwap = this.handleSoundSwap.bind(this)
    this.handleSoundChange = this.handleSoundChange.bind(this)
    this.handleChannelDelete = this.handleChannelDelete.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleSearch(event) {
    const query = event.target.value
    return Sound.search(query).then((foundSounds) => {
      this.setState({ foundSounds })
    })
  }

  handleSoundSwap(channel) {
    return () => {
      this.setState({
        inSwap: this.state.inSwap == channel.props.id ? undefined : channel.props.id
      })
    }
  }

  handleSoundChange(sound) {
    const sounds = this.state.sounds
    sounds[this.state.inSwap] = sound
    this.setState({
      sounds,
      inSwap: undefined
    })
  }

  handleChannelDelete(channel) {
    return () => {
      this.state.sounds.splice(channel.props.id, 1)
      this.setState({
        sounds: this.state.sounds
      })
    }
  }

  channels() {
    return this.state.sounds.map((sound, index) => (
      <Channel
          id={index}
          inSwap={index === this.state.inSwap}
          key={sound.path}
          onDelete={this.handleChannelDelete}
          onSoundSwap={this.handleSoundSwap}
          sound={sound}
      />
    ))
  }

  handleKeyDown(event) {
    if (event.key === "Escape") {
      this.setState({
        inSwap: undefined
      })
    }
  }

  render () {
    const newChannelId = this.state.sounds.length + 1
    const searchBlock = (
      <div className="search-box">
        <SearchField onSearch={this.handleSearch} />
        <SearchResults
            onSelect={this.handleSoundChange}
            sounds={this.state.foundSounds}
        />
      </div>)
    return (
      <div onKeyDown={this.handleKeyDown} tabIndex="0">
        <p>React Mixer</p>
        <div className={classNames("channels", { "in-swap": this.state.inSwap })}>
          {this.channels()}
          <AddChannel
              id={newChannelId}
              inSwap={newChannelId === this.state.inSwap}
              onClick={this.handleSoundSwap}
          />
        </div>
        { this.state.inSwap != undefined ? searchBlock : null }
      </div>
    )
  }
}

export default App
