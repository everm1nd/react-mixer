import React from "react"
import { shallow } from "enzyme"

import LoopButton from "components/LoopButton"

describe("<LoopButton/>", function () {
  const testFunction = () => { console.log("bam!") }
  const wrapper = shallow(<LoopButton onClick={testFunction} />)
  const input = wrapper.find("input[type=\"button\"]")

  it("renders one button", function () {
    expect(input).to.have.length(1)
  })

  it("passes `onClick` prop to onClick of button", function () {
    expect(input.props().onClick).to.be.eql(testFunction)
  })
})
