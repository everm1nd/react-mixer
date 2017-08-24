import React from "react"
import { shallow } from "enzyme"

import DeleteChannel from "components/DeleteChannel"

describe("<DeleteChannel/>", function () {
  const testFunction = () => { console.log("bam!") }
  const wrapper = shallow(<DeleteChannel onClick={testFunction} />)
  const input = wrapper.find("input[type=\"button\"]")

  it("renders one button", function () {
    expect(input).to.have.length(1)
  })

  it("passes `onClick` prop to onClick of button", function () {
    expect(input.props().onClick).to.be.eql(testFunction)
  })
})
