import React from "react"
import { shallow } from "enzyme"

import App from "components/App"
import Sound from "models/Sound"

describe("<App/>", function () {
  let wrapper = shallow(<App />)

  beforeEach(() => { wrapper = shallow(<App />) })

  const swapChannel = (id) => {
    wrapper.instance().handleSoundSwap({ props: { id } })()
  }

  it("renders a title", () => {
    expect(wrapper.find("h1").text()).to.eql("React Mixer")
  })

  it("renders all sounds from Sound.all() as separate channels", () => {
    expect(wrapper.find("Channel")).to.have.length(Sound.all().length)
  })

  it("renders AddChannel button", () => {
    expect(wrapper.find("AddChannel")).to.have.length(1)
  })

  it("assigns sounds to every channel", () => {
    expect(wrapper.find("Channel").everyWhere(channel => channel.props().sound instanceof Sound)).to.eql(true)
  })

  it("saves all available sounds to .sounds", () => {
    expect(wrapper.state().sounds).to.eql(Sound.all())
  })

  context("has AddChannel button", () => {
    let addChannelButton

    beforeEach(() => { addChannelButton = wrapper.find("AddChannel") })

    it("present", () => {
      expect(addChannelButton).to.have.length(1)
    })

    it("with .handleSoundSwap as prop.onClick", () => {
      expect(addChannelButton.props().onClick).to.eql(wrapper.instance().handleSoundSwap)
    })

    it("with new channel id as prop.id", () => {
      expect(addChannelButton.props().id).to.eql(wrapper.state().sounds.length + 1)
    })
  })

  describe(".handleSoundSwap", () => {
    it("changes a inSwap in state", () => {
      swapChannel(1)
      expect(wrapper.state().inSwap).to.eql(1)
    })

    it("sets inSwap to a new channel if this was selected already", () => {
      swapChannel(1)
      swapChannel(0)
      expect(wrapper.state().inSwap).to.eql(0)
    })

    it("sets inSwap to undefined if same channel received swap event again", () => {
      swapChannel(0)
      swapChannel(0)
      expect(wrapper.state().inSwap).to.eql(undefined)
    })

    it("does not render search block by default", () => {
      expect(wrapper.find("Search")).to.have.length(0)
    })

    context("when in swap", () => {
      beforeEach(() => {
        swapChannel(0)
      })

      it("shows search block", () => {
        expect(wrapper.find("Search")).to.have.length(1)
      })
    })
  })

  describe(".handleSoundChange", () => {
    const sound = new Sound({ name: "Dog", path: "dog.mp3" })

    before(() => {
      swapChannel(0)
      wrapper.instance().handleSoundChange(sound)
    })

    it("updates state with sound received", () => {
      swapChannel(0)
      wrapper.instance().handleSoundChange(sound)
      expect(wrapper.state().sounds[0]).to.eql(sound)
    })

    it("resets inSwap state", () => {
      expect(wrapper.state().inSwap).to.eql(undefined)
    })
  })

  describe(".handleKeyDown", () => {
    it("resets inSwap state when ESCAPE is pressed", () => {
      swapChannel(0)
      expect(wrapper.state().inSwap).to.eql(0)
      wrapper.simulate("keyDown", {
        key: "Escape",
        keyCode: 27,
        which: 27
      })
      expect(wrapper.state().inSwap).to.be.undefined
    })
  })
})
