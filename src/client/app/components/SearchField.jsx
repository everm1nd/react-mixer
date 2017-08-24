import React from "react"
import PropTypes from "prop-types"

const handleKeyPressWith = (handler) => (event) => {
  if (event.key === "Enter") {
    handler(event)
  }
}

class SearchField extends React.Component {
  componentDidMount() {
    this.searchField.focus()
  }

  render() {
    return (
      <input
          className="search-field"
          onKeyPress={handleKeyPressWith(this.props.onSearch)}
          ref={(input) => { this.searchField = input }}
      />)
  }
}

SearchField.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default SearchField
