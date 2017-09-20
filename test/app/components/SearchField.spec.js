import React from "react"
import { shallow } from "enzyme"

import SearchField from "components/SearchField"

describe("<SearchField/>", () => {
  const searchStub = sinon.stub()
  const wrapper = shallow(<SearchField onSearch={searchStub} />)
  const input = wrapper.find("input")

  beforeEach(() => searchStub.resetHistory())

  it("renders one input", () => {
    expect(input).to.have.length(1)
  })

  it("renders freesound credits block", () => {
    expect(wrapper.find(".freesound-credits")).to.have.length(1)
  })

  it("calls `onSearch` when Enter is pressed", () => {
    input.simulate("keyPress", {
      key: "Enter",
      keyCode: 13,
      which: 13
    })
    expect(searchStub).to.have.been.called
  })

  it("doesn't call `onSearch` when other key is pressed", () => {
    input.simulate("keyPress", {
      key: "A",
      keyCode: 65,
      which: 65
    })
    expect(searchStub).to.not.have.been.called
  })

  it("set focus on search field when component gets initialized", () => {
    wrapper.instance().searchField = { focus: () => {} }
    const focusSpy = sinon.spy(wrapper.instance().searchField, "focus")
    wrapper.instance().componentDidMount()
    expect(focusSpy).to.have.been.called
  })
})
