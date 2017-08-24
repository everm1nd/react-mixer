import React from "react"
import PropTypes from "prop-types"
import Sound from "models/Sound"

import { renderDuration } from "lib/time"

class SearchResults extends React.Component {
  renderResult(sound) {
    return (
      <div className="search-result" data-path={sound.path} key={sound.path}>
        <a href='#' onClick={() => this.props.onSelect(sound)}>
          {sound.name} ({renderDuration(sound.duration)})
        </a>
      </div>)
  }

  renderResults(sounds) {
    return sounds.map((sound) => this.renderResult(sound))
  }

  render() {
    return (
      <div className="search-results">
        {this.renderResults(this.props.sounds)}
      </div>
    )
  }
}

SearchResults.propTypes = {
  onSelect: PropTypes.func.isRequired,
  sounds: PropTypes.arrayOf(Sound).isRequired
}

export default SearchResults
