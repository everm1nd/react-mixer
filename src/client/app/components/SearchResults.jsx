import React from 'react';
import PropTypes from 'prop-types';

const renderResult = (sound) => (
  <div className="search-result" key={sound.path} data-path={sound.path}>{sound.name}</div>
)

const renderResults = (sounds) => (
  sounds.map((sound) => renderResult(sound))
)

const SearchResults = (props) => {
  return(<div className="search-results">
    {renderResults(props.sounds)}
  </div>);
}

SearchResults.propTypes = {
  sounds: PropTypes.array.isRequired
}

export default SearchResults;
