import React from 'react';
import PropTypes from 'prop-types';

class SearchResults extends React.Component {
  renderResult(sound) {
    return <div className="search-result" key={sound.path} data-path={sound.path}>
      <a href='#' onClick={() => this.props.onSelect(sound)}>{sound.name} ({sound.duration})</a>
    </div>
  }

  renderResults(sounds) {
    return sounds.map((sound) => this.renderResult(sound))
  }

  render() {
    return (
      <div className="search-results">
        {this.renderResults(this.props.sounds)}
      </div>
    );
  }
}

SearchResults.propTypes = {
  sounds: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default SearchResults;
