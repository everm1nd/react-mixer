import React from 'react';
import PropTypes from 'prop-types';

const DeleteChannel = (props) => {
  return <div><input type="button" value="✕" onClick={props.onClick} /></div>;
}

DeleteChannel.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default DeleteChannel;
