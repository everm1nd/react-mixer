import React from "react"
import PropTypes from "prop-types"

const LoopButton = (props) => {
  return (
    <div>
      <input
          onClick={props.onClick}
          type="button"
          value="⟳"
      />
    </div>)
}

LoopButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default LoopButton
