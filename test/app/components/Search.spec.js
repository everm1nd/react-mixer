import React from "react"
import { shallow } from "enzyme"

import Search from "components/Search"
import Sound from "models/Sound"

describe("<Search/>", () => {
  const selectStub = sinon.stub()
  const wrapper = shallow(<Search onSelect={selectStub} />)

  beforeEach(() => selectStub.resetHistory())

  it("renders SearchField", () => {
    expect(wrapper.find("SearchField")).to.have.length(1)
  })

  it("renders SearchResults", () => {
    expect(wrapper.find("SearchResults")).to.have.length(1)
  })

  it("initializes with empty query state", () => {
    expect(wrapper.state().query).to.eql("")
  })

  it("initializes with page state equal 1", () => {
    expect(wrapper.state().page).to.eql(1)
  })

  it("initializes with empty foundSounds state", () => {
    expect(wrapper.state().foundSounds).to.eql([])
  })

  it("pass handleSearch function to SearchField", function () {
    expect(wrapper.find("SearchField").props().onSearch).not.to.be.undefined
    expect(wrapper.find("SearchField").props().onSearch).to.eql(wrapper.instance().handleSearch)
  })

  it("pass onSelect prop function to SearchResults", () => {
    expect(wrapper.find("SearchResults").props().onSelect).not.to.be.undefined
    expect(wrapper.find("SearchResults").props().onSelect).to.eql(wrapper.instance().props.onSelect)
  })

  context("search functions", () => {
    let updateSearchResultsStub

    beforeEach(() => {
      updateSearchResultsStub = sinon.stub(wrapper.instance(), "updateSearchResults")
    })

    afterEach(() => {
      updateSearchResultsStub.restore()
    })

    describe(".handleSearch", () => {
      const doSearch = () => wrapper.instance().handleSearch({ target: { value: "cat" } })

      it("changes query in state", () => {
        doSearch()
        expect(wrapper.state().query).to.eql("cat")
      })

      it("updates search results after", () => {
        doSearch()
        expect(updateSearchResultsStub).to.have.been.called
      })

      it("resets page to 1", () => {
        wrapper.setState({ page: 5 })
        doSearch()
        expect(wrapper.state().page).to.eql(1)
      })
    })

    describe(".handlePageChange", () => {
      beforeEach(() => {
        wrapper.instance().handlePageChange({ selected: 2 })
      })

      it("changes query in state", () => {
        expect(wrapper.state().page).to.eql(3)
      })

      it("updates search results after", () => {
        expect(updateSearchResultsStub).to.have.been.called
      })
    })
  })

  describe(".updateSearchResults", (done) => {
    let searchStub
    const searchResults = {
      page: 5,
      totalPages: 15,
      sounds: [ new Sound({ name: "Dog Barks" }) ]
    }

    beforeEach(() => {
      searchStub = sinon.stub(Sound, "search").resolves(searchResults)
      wrapper.setState({
        page: 5,
        query: "cats"
      })
    })

    afterEach(() => {
      searchStub.restore()
    })

    it("search for sounds with Sound model", (done) => {
      wrapper.instance().updateSearchResults().then(() => {
        expect(searchStub).to.have.been.calledWith("cats", { page: 5 })
      }).then(done, done)
    })

    it("sets found sound in state.foundSounds", (done) => {
      wrapper.instance().updateSearchResults().then(() => {
        expect(wrapper.state().foundSounds).to.eql(searchResults.sounds)
      }).then(done, done)
    })
  })
})
