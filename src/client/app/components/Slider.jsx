import React from 'react';

class Slider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {position : 80};
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
