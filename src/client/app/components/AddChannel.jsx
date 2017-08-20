import React from 'react';
import PropTypes from 'prop-types';

const AddChannel = (props) => {
  return <div className="channel"><input type="button" value="+" onClick={props.onClick({ props })} /></div>;
}

AddChannel.propTypes = {
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default AddChannel;
