import React from 'react';
import PropTypes from 'prop-types';

const LoopButton = (props) => {
  return <input type="button" value="⟳" onClick={props.onClick} />;
}

LoopButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default LoopButton;
