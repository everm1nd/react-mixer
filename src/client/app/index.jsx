import React from 'react';
import {render} from 'react-dom';
import Channel from './components/Channel.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <p>React Mixer</p>
        <Channel sound="rain.wav"/>
        <Channel volume="50" sound="birds.wav"/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
