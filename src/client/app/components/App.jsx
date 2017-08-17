import React from 'react';
import {render} from 'react-dom';
import Channel from 'components/Channel';
import SearchField from 'components/SearchField';
import SearchResults from 'components/SearchResults';
import Sound from 'models/Sound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSoundSwap = this.handleSoundSwap.bind(this);
    this.handleSoundChangle = this.handleSoundChangle.bind(this);
  }

  handleSearch(event) {
    this.setState({
      query: event.target.value
    })
  }

  handleSoundSwap(channel) {
    return () => {
      this.setState({
        inSwap: this.state.inSwap == channel.props.id ? undefined : channel.props.id
      })
    }
  }

  handleSoundChangle(event) {
    console.log(event)
  }

  channels() {
    return Sound.all().map((sound, index) => (
      <Channel key={index} id={index} inSwap={index === this.state.inSwap} onSoundSwap={this.handleSoundSwap} sound={sound.path}/>
    ))
  }

  render () {
    const searchBlock = <div>
      <SearchField onSearch={this.handleSearch}/>
      <SearchResults onSelect={this.handleSoundChangle} sounds={Sound.search(this.state.query)}/>
    </div>;
    return (
      <div>
        <p>React Mixer</p>
        <div className="channels">
          {this.channels()}
        </div>
        { this.state.inSwap != undefined ? searchBlock : null }
      </div>
    );
  }
}

export default App;
