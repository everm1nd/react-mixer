import React from 'react';
import {render} from 'react-dom';
import Channel from 'components/Channel';
import SearchField from 'components/SearchField';
import SearchResults from 'components/SearchResults';
import Sound from 'models/Sound';

class App extends React.Component {
  handleSearch(event) {
    return Sound.search(event.target.value);
  }

  render () {
    return (
      <div>
        <p>React Mixer</p>
        <div className="channels">
          <Channel sound="rain.wav"/>
          <Channel volume={0.5} sound="birds.wav"/>
        </div>
        <div>
          <SearchField onSearch={this.handleSearch}/>
          <SearchResults sounds={Sound.all()}/>
        </div>
      </div>
    );
  }
}

export default App;
