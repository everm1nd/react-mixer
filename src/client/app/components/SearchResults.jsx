import React from "react"
import PropTypes from "prop-types"
import ReactPaginate from "react-paginate"

import Sound from "models/Sound"

import { renderDuration } from "lib/time"

class SearchResults extends React.Component {
  renderResult(sound) {
    return (
      <div
          className="search-result" data-path={sound.path} key={sound.path}
          onClick={() => this.props.onSelect(sound)}
      >
        <div className="info">
          <div className="wrapper">
            <h5>{sound.name}</h5>
            <p className="description">{renderDuration(sound.duration)}</p>
          </div>
        </div>
        <img className="waveform" src={sound.waveform} />
      </div>)
  }

  renderResults(sounds) {
    return sounds.map((sound) => this.renderResult(sound))
  }

  renderPagination() {
    return (
      <ReactPaginate
          containerClassName={"pagination"}
          nextLabel={">"}
          onPageChange={this.props.onPageChange}
          pageCount={this.props.pageCount}
          previousLabel={"<"}
      />
    )
  }

  render() {
    return (
      <div className="search-results">
        {this.renderResults(this.props.sounds)}
        { this.props.sounds.length > 0 ? this.renderPagination() : null }
      </div>
    )
  }
}

SearchResults.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  sounds: PropTypes.arrayOf(Sound).isRequired
}

export default SearchResults
