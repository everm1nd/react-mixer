import Sound from "models/Sound.js"

describe("Sound", () => {
  describe(".all", () => {
    it("returns an array", () => {
      expect(Sound.all()).to.be.an("Array")
    })

    it("returns an array of sounds", () => {
      expect(Sound.all().every((el) => ( el instanceof Sound ))).to.be.true
    })
  })

  describe(".search", () => {
    let adapterStub

    beforeEach(() => {
      const searchResults = {
        data: {
          count: 100,
          results: [
            {
              name: "Dog",
              previews: { "preview-hq-ogg": "woof.ogg" },
              duration: 10, images: { "waveform_m": "woof.jpg" }
            },
            {
              name: "Cat",
              previews: { "preview-hq-ogg": "meow.ogg" },
              duration: 15,
              images: { "waveform_m": "meow.jpg" }
            }
          ]
        }
      }
      adapterStub = {
        search: sinon.stub().resolves(searchResults)
      }
      Sound.__Rewire__("adapter", adapterStub)
    })

    afterEach(() => {
      adapterStub.search.reset()
    })

    it("and parses result from freesound.org and return an array of Sounds", (done) => {
      Sound.search("dog").then((sounds) => {
        expect(sounds).to.eql({
          pageCount: 5,
          sounds: [
            { name: "Dog", path: "woof.ogg", duration: 10, waveform: "woof.jpg" },
            { name: "Cat", path: "meow.ogg", duration: 15, waveform: "meow.jpg" }
          ]
        })
      }).then(done, done)
    })

    it("with query and params", () => {
      Sound.search("dog", { page: 3 })
      expect(adapterStub.search).to.have.been.calledWith("dog", { page: 3, page_size: 20 })
    })

    it("throws an error when query is not set", () => {
      const doSearch = () => { Sound.search() }
      expect(doSearch).to.throw(Error, "Search query should be set")
    })

    it("does not throw an error when query empty", () => {
      const doSearch = () => { Sound.search("") }
      expect(doSearch).to.not.throw(Error, "Search query should be set")
    })
  })
})
