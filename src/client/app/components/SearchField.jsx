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
      <div className="search-field-container">
        <input
            className="search-field"
            onKeyPress={handleKeyPressWith(this.props.onSearch)}
            placeholder="type sound name and press enter..."
            ref={(input) => { this.searchField = input }}
        />
        <div className="freesound-credits">
          powered by
          <a href="http://freesound.org/" target="blank">
            <img src="../assets/freesound-logo.png" />
          </a>
        </div>
      </div>
    )
  }
}

SearchField.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default SearchField
