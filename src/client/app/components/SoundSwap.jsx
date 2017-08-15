import React from 'react';
import PropTypes from 'prop-types';

const SoundSwap = (props) => {
  const style = {
    color: props.active ? 'red' : 'black'
  }
  return <div><input style={style} type="button" value="⇄" onClick={props.onClick} /></div>;
}

SoundSwap.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default SoundSwap;
