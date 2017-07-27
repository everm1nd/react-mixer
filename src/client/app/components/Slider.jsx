import React from 'react';
import PropTypes from 'prop-types';

const onChange = (props) => (event) => ( props.onChange(event.target.value / 100) );
const renderValue = (volume) => ( Math.round(volume * 100) );

const Slider = (props) => {
  return (
    <div className="slider-container">
      <input className="vertical" type="range" onChange={onChange(props)} value={renderValue(props.position)} />
      <div className="value-display">{renderValue(props.position)}</div>
    </div>
  );
}

Slider.propTypes = {
  position: PropTypes.number.isRequired
}

export default Slider;
