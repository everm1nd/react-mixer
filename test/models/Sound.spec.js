import Sound from 'models/Sound.js'

describe('Sound', () => {
  describe('.all', () => {
    it('returns an array', () => {
      expect(Sound.all()).to.be.an('Array')
    });

    it('returns an array of sounds', () => {
      expect(Sound.all().every((el) => ( el instanceof Sound ))).to.be.true
    });
  });

  describe('.search', () => {
    it('parses result from freesound.org and return an array of Sounds', (done) => {
      const searchResults = {
        data: {
          results: [
            { name: 'Dog', previews: { 'preview-hq-ogg': 'woof.ogg' } },
            { name: 'Cat', previews: { 'preview-hq-ogg': 'meow.ogg' } }
          ]
        }
      }
      const adapterStub = {
        search: (query) => sinon.stub().resolves(searchResults)()
      }
      Sound.__Rewire__('adapter', adapterStub)
      Sound.search('dog').then((sounds) => {
        expect(sounds).to.eql([
          { name: 'Dog', path: 'woof.ogg' },
          { name: 'Cat', path: 'meow.ogg' }
        ])
      }).then(done, done)
    });

    it('throws an error when query is not set', () => {
      const doSearch = () => { Sound.search() }
      expect(doSearch).to.throw(Error, "Search query should be set");
    });

    it('does not throw an error when query empty', () => {
      const doSearch = () => { Sound.search('') }
      expect(doSearch).to.not.throw(Error, "Search query should be set");
    });
  });
});
