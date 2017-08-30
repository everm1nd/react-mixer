import React from "react"
import PropTypes from "prop-types"

import SearchField from "components/SearchField"
import SearchResults from "components/SearchResults"

import Sound from "models/Sound"

class Search extends React.Component {
  constructor() {
    super()
    this.state = {
      foundSounds: []
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(event) {
    const query = event.target.value
    return Sound.search(query).then((foundSounds) => {
      this.setState({ foundSounds })
    })
  }

  render() {
    return (
      <div className="search">
        <SearchField onSearch={this.handleSearch} />
        <SearchResults
            onSelect={this.props.onSelect}
            sounds={this.state.foundSounds}
        />
      </div>
    )
  }
}

Search.propTypes = {
  onSelect: PropTypes.func.isRequired
}

export default Search
