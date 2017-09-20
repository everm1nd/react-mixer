import React from "react"
import PropTypes from "prop-types"

import SearchField from "components/SearchField"
import SearchResults from "components/SearchResults"

import Sound from "models/Sound"

class Search extends React.Component {
  constructor() {
    super()
    this.state = {
      query: "",
      page: 1,
      pageCount: 1,
      foundSounds: []
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  updateSearchResults() {
    const query = this.state.query
    const params = {
      page: this.state.page
    }
    return Sound.search(query, params).then((searchResults) => {
      this.setState({
        pageCount: searchResults.pageCount,
        foundSounds: searchResults.sounds
      })
    })
  }

  handleSearch(event) {
    this.setState({
      query: event.target.value,
      page: 1
    }, this.updateSearchResults)
  }

  handlePageChange(data) {
    this.setState({
      page: data.selected + 1
    }, this.updateSearchResults)
  }

  render() {
    return (
      <div className="search">
        <SearchField onSearch={this.handleSearch} />
        <SearchResults
            onPageChange={this.handlePageChange}
            onSelect={this.props.onSelect}
            pageCount={this.state.pageCount}
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
