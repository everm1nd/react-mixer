import React from "react"
import PropTypes from "prop-types"

const SoundSwap = (props) => {
  const style = {
    color: props.active ? "red" : "black"
  }
  return (
    <div>
      <input
          onClick={props.onClick}
          style={style}
          type="button"
          value="⇄"
      />
    </div>)
}

SoundSwap.defaultProps = {
  active: false
}

SoundSwap.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default SoundSwap
