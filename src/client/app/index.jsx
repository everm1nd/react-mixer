import React from 'react';
import {render} from 'react-dom';
import Slider from './components/Slider.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <p>React Mixer</p>
        <Slider />
        <Slider default_position="50" />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
