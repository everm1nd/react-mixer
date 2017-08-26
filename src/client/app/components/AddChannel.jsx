import React from "react"
import PropTypes from "prop-types"

const AddChannel = (props) => {
  const style = {
    backgroundColor: props.inSwap ? "#ffe0b2" : "white"
  }
  return (
    <div className="channel new" style={style}>
      <input
          onClick={props.onClick({ props })}
          type="button"
          value="+"
      />
    </div>)
}

AddChannel.defaultProps = {
  inSwap: false
}

AddChannel.propTypes = {
  id: PropTypes.number.isRequired,
  inSwap: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default AddChannel
