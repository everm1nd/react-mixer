import React from 'react';
import PropTypes from 'prop-types';

const handleKeyPressWith = (handler) => (event) => {
  if (event.key === 'Enter') {
    handler(event);
  }
}

class SearchField extends React.Component {
  componentDidMount() {
    this.searchField.focus()
  }

  render() {
    return <input
      ref={(input) => { this.searchField = input; }}
      className="search-field"
      onKeyPress={handleKeyPressWith(this.props.onSearch)}
    />
  }
}

SearchField.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default SearchField;
