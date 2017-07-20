import React from 'react';

class Slider extends React.Component {

  constructor(props) {
    super(props);
    this.state = { position: props.position };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ position: event.target.value });
  }

  render() {
    return (
      <div className="slider-container">
        <input className="vertical" type="range" onChange={this.onChange} value={this.state.position} />
        <span>{this.state.position}</span>
      </div>
    );
  }

}

export default Slider;
