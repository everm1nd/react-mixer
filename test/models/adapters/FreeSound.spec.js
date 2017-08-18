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

  describe('.renderParams', () => {
    it('returns a string with URL params from object passed', () => {
      const params = {
        a: 10,
        b: '123',
        c: ['a','b']
      }
      expect(adapter.renderParams(params)).to.eql('a=10&b=123&c=a%2Cb')
    })
  });

  describe('.urlFor', () => {
    it('returns url for FreeSound.org resource', () => {
      const params = {
        fields: ['name','url']
      }
      expect(adapter.urlFor('some/resource', params)).to.eql(`http://freesound.org/apiv2/some/resource/?fields=name%2Curl&token=${token}`)
    })
  })

  describe('.search', () => {
    it('makes a request to freesound.org with axios', () => {
      const requestParams = {
        query: 'dog',
        fields: ['name', 'previews', 'download']
      }
      adapter.search('dog')
      expect(getStub).to.have.been.calledWith(adapter.urlFor('search/text', requestParams));
    })

    it('changes fetched fields if they was passed as a second argument', () => {
      const fields = ['name', 'value']
      const requestParams = {
        query: 'dog',
        fields
      }
      adapter.search('dog', fields)
      expect(getStub).to.have.been.calledWith(adapter.urlFor('search/text', requestParams));
    })
  })
});
