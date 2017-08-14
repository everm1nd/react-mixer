import React from 'react';
import PropTypes from 'prop-types';

const handleKeyPressWith = (handler) => (event) => {
  if (event.key === 'Enter') {
    handler(event);
  }
}

const SearchField = (props) => {
  return <input className="search-field" onKeyPress={handleKeyPressWith(props.onSearch)} />;
}

SearchField.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default SearchField;
