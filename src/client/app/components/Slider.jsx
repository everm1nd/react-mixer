import React from 'react';
import PropTypes from 'prop-types';

class Slider extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange(event.target.value / 100);
  }

  renderValue(volume) {
    return Math.round(volume * 100);
  }

  render() {
    return (
      <div className="slider-container">
        <input className="vertical" type="range" onChange={this.onChange} value={this.renderValue(this.props.position)} />
        <div className="value-display">{this.renderValue(this.props.position)}</div>
      </div>
    );
  }

}

Slider.propTypes = {
  position: PropTypes.number.isRequired
}

export default Slider;
