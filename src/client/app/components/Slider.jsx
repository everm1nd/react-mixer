import React from 'react';

class Slider extends React.Component {

  constructor(props) {
    const DEFAULT_POSITION = 80;

    super(props);
    this.state = { position: props.default_position || DEFAULT_POSITION };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ position: event.target.value });
  }

  render() {
    return (
      <div>
        <input type="range" onChange={this.onChange} value={this.state.position} />
        <span>{this.state.position}</span>
      </div>
    );
  }

}

export default Slider;
