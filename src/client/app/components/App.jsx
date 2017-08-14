import React from 'react';
import {render} from 'react-dom';
import Channel from './Channel.jsx';
import SearchField from './SearchField.jsx';

const handleSearch = (event) => {
  console.log(event.target.value);
}

class App extends React.Component {
  render () {
    return (
      <div>
        <p>React Mixer</p>
        <div className="channels">
          <Channel sound="rain.wav"/>
          <Channel volume={0.5} sound="birds.wav"/>
        </div>
        <div>
          <SearchField onSearch={handleSearch}/>
        </div>
      </div>
    );
  }
}

export default App;
