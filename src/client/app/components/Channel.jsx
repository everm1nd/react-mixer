import React from 'react';
import Slider from './Slider.jsx';

class Channel extends React.Component {

  constructor(props) {
    const DEFAULT_VOLUME = 80;

    super(props);
    this.state = { volume: props.volume || DEFAULT_VOLUME };
  }

  render() {
    return (
      <Slider position={this.state.volume} />
    );
  }

}

export default Channel;
