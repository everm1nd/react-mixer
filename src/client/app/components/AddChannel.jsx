import React from 'react';
import PropTypes from 'prop-types';

const AddChannel = (props) => {
  const style = {
    backgroundColor: props.inSwap ? '#ffe0b2' : 'white'
  }
  return <div style={style} className="channel">
    <input type="button" value="+" onClick={props.onClick({ props })} />
  </div>;
}

AddChannel.propTypes = {
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  inSwap: PropTypes.bool
}

export default AddChannel;
