import React from "react"
import PropTypes from "prop-types"

const DeleteChannel = (props) => {
  return (
    <div>
      <input
          onClick={props.onClick}
          type="button"
          value="✕"
      />
    </div>)
}

DeleteChannel.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default DeleteChannel
