import Sound from 'models/Sound.js';

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
    it('returns filtered output if term is set', () => {
      const sounds = [
        new Sound({ name: 'Cow', path: 'cow.mp3' }),
        new Sound({ name: 'Dog', path: 'dog.mp3' })
      ]
      sinon.stub(Sound, "all").returns(sounds);
      expect(Sound.search('co')).to.eql([
        new Sound({ name: 'Cow', path: 'cow.mp3' })
      ])
    });

    it('throws an error when query is not set', () => {
      const doSearch = () => { Sound.search() }
      expect(doSearch).to.throw(Error, "Search query should be set");
    });
  });
});
