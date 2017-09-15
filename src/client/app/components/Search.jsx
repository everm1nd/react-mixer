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
      foundSounds: []
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handleSearch(event) {
    const query = event.target.value
    return Sound.search(query).then((foundSounds) => {
      this.setState({ foundSounds })
    })
  }

  handlePageChange(data) {
    console.log("page", data.selected + 1)
  }

  render() {
    return (
      <div className="search">
        <SearchField onSearch={this.handleSearch} />
        <SearchResults
            onPageChange={this.handlePageChange}
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
