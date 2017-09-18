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

  describe(".handleSearch", () => {
    let updateSearchResultsStub

    beforeEach(() => {
      updateSearchResultsStub = sinon.stub(wrapper.instance(), "updateSearchResults")
      wrapper.instance().handleSearch({ target: { value: "cat" } })
    })

    afterEach(() => {
      updateSearchResultsStub.restore()
    })

    it("changes query in state", () => {
      expect(wrapper.state().query).to.eql("cat")
    })

    it("updates search results after", () => {
      expect(updateSearchResultsStub).to.have.been.called
    })
  })

  describe(".handlePageChange", () => {
    let updateSearchResultsStub

    beforeEach(() => {
      updateSearchResultsStub = sinon.stub(wrapper.instance(), "updateSearchResults")
      wrapper.instance().handlePageChange({ selected: 2 })
    })

    afterEach(() => {
      updateSearchResultsStub.restore()
    })

    it("changes query in state", () => {
      expect(wrapper.state().page).to.eql(3)
    })

    it("updates search results after", () => {
      expect(updateSearchResultsStub).to.have.been.called
    })
  })
})
