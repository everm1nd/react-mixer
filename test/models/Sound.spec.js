import Sound from 'models/Sound.js';

describe('Sound', () => {
  describe('.search', () => {
    it('returns an array', () => {
      expect(Sound.search()).to.be.an('Array')
    });

    it('returns an array of sounds', () => {
      expect(Sound.search().every((el) => ( el instanceof Sound ))).to.be.true
    });

    it('returns filtered output if term is set', () => {
      const term = 'bird'
      const allSounds = Sound.search()
      const filteredSounds = allSounds.filter((sound) => sound.name.match(new RegExp(term, "i")))
      expect(Sound.search('bird')).to.eql(filteredSounds)
    });
  });
});
