import React from 'react';
import PropTypes from 'prop-types';

const LoopButton = (props) => {
  return <div><input type="button" value="⟳" onClick={props.onClick} /></div>;
}

LoopButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default LoopButton;
