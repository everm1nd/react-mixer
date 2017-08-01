import Sound from '../../src/client/app/models/Sound.js';

describe('Sound', () => {
  describe('.search', () => {
    it('returns an array', () => {
      expect(Sound.search()).to.be.an('Array')
    });

    it('returns an array of sounds', () => {
      expect(Sound.search().every((el) => ( el instanceof Sound ))).to.be.true
    });
  });
});
