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
  }

  handleSearch(event) {
    this.setState({
      query: event.target.value
    })
  }

  channels() {
    return Sound.all().map((sound, index) => (
      <Channel key={index} id={index} sound={sound.path}/>
    ))
  }

  render () {
    return (
      <div>
        <p>React Mixer</p>
        <div className="channels">
          {this.channels()}
        </div>
        <div>
          <SearchField onSearch={this.handleSearch}/>
          <SearchResults sounds={Sound.search(this.state.query)}/>
        </div>
      </div>
    );
  }
}

export default App;
