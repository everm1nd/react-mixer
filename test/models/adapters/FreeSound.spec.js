const getStub = sinon.stub();
const FreeSound = proxyquire.noCallThru().load(process.cwd() + '/src/client/app/models/adapters/FreeSound',
  { 'axios': { get: getStub } }
).default;

describe('FreeSound', () => {
  const token = '1234567890'
  const adapter = new FreeSound({ token })

  describe('.constructor', () => {
    it('set token', () => {
      const adapter = new FreeSound({})
      expect(adapter.token).to.be.eql(process.env.FREESOUND_API_KEY)
    });

    it('change token to user-defined if it was passed in initialzier', () => {
      const adapter = new FreeSound({ token: '123' })
      expect(adapter.token).to.be.eql('123')
    })
  });

  describe('.urlFor', () => {
    it('returns url for FreeSound.org resource', () => {
      expect(adapter.urlFor('some/resource')).to.eql(`http://freesound.org/apiv2/some/resource`)
    })
  })

  describe('.search', () => {
    it('makes a request to freesound.org with axios', () => {
      const requestParams = {
        params: {
          token,
          query: 'dog',
          fields: ['name', 'previews', 'download']
        }
      }
      adapter.search('dog')
      expect(getStub).to.have.been.calledWithMatch(adapter.urlFor('search/text'), requestParams);
    })

    it('changes fetched fields if they was passed as a second argument', () => {
      const fields = ['name', 'value']
      const requestParams = {
        params: {
          token,
          query: 'dog',
          fields
        }
      }
      adapter.search('dog', { params: { fields } })
      expect(getStub).to.have.been.calledWithMatch(adapter.urlFor('search/text'), requestParams);
    })
  })
});
