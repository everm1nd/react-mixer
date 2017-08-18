import React from 'react';
import { mount, shallow } from 'enzyme';

import App from 'components/App';
import Sound from 'models/Sound';

describe('<App/>', function () {
  let wrapper = shallow(<App />);

  beforeEach(() => { wrapper = shallow(<App />) });

  const swapChannel = (id) => {
    wrapper.instance().handleSoundSwap({ props: { id } })()
  }

  it('renders a title', () => {
    expect(wrapper.find('p').text()).to.eql('React Mixer');
  });

  it('renders all sounds from Sound.all() as separate channels', () => {
    expect(wrapper.find('Channel')).to.have.length(Sound.all().length);
  });

  it('assigns sounds to every channel', () => {
    expect(wrapper.find('Channel').everyWhere(channel => channel.props().sound instanceof Sound)).to.eql(true)
  });

  it('saves all available sounds to .sounds', () => {
    expect(wrapper.state().sounds).to.eql(Sound.all())
  });

  it('initializes with empty foundSounds state', () => {
    expect(wrapper.state().foundSounds).to.eql([])
  })

  describe('.handleSearch', (done) => {
    it('changes a foundSounds in state', () => {
      const searchResults = [
        new Sound({ name: 'Little Dog', path: 'wif.ogg' }),
        new Sound({ name: 'Big Dog', path: 'wooooooooof.ogg' })
      ]
      const promiseStub = sinon.stub().resolves(searchResults)()
      const searchStub = sinon.stub(Sound, 'search').returns(promiseStub)

      wrapper.instance().handleSearch({ target: { value: 'dogs' } }).then(() => {
        expect(wrapper.state()).to.include({ foundSounds: searchResults })
        searchStub.restore()
      }).then(done, done)
    })
  })

  describe('.handleSoundSwap', () => {
    it('changes a inSwap in state', () => {
      swapChannel(1)
      expect(wrapper.state().inSwap).to.eql(1)
    })

    it('sets inSwap to a new channel if this was selected already', () => {
      swapChannel(1)
      swapChannel(0)
      expect(wrapper.state().inSwap).to.eql(0)
    })

    it('sets inSwap to undefined if same channel received swap event again', () => {
      swapChannel(0)
      swapChannel(0)
      expect(wrapper.state().inSwap).to.eql(undefined)
    })

    it('does not render search block by default', () => {
      expect(wrapper.find('SearchField')).to.have.length(0);
      expect(wrapper.find('SearchResults')).to.have.length(0);
    })

    context('when in swap', () => {
      beforeEach(() => {
        swapChannel(0)
      })

      it('shows search block', () => {
        expect(wrapper.find('SearchField')).to.have.length(1);
        expect(wrapper.find('SearchResults')).to.have.length(1);
      })

      it('pass handleSearch function to SearchField', function () {
        expect(wrapper.find('SearchField').props().onSearch).to.eql(wrapper.instance().handleSearch);
      })

      it('assigns .handleSoundChangle to SearchResults', () => {
        expect(wrapper.find('SearchResults').props().onSelect).to.eql(wrapper.instance().handleSoundChangle);
      })
    })
  })

  describe('.handleSoundChange', () => {
    const sound = new Sound({ name: 'Dog', path: 'dog.mp3' })

    before(() => {
      swapChannel(0)
      wrapper.instance().handleSoundChangle(sound)
    })

    it('updates state with sound received', () => {
      swapChannel(0)
      wrapper.instance().handleSoundChangle(sound)
      expect(wrapper.state().sounds[0]).to.eql(sound)
    })

    it('resets inSwap state', () => {
      expect(wrapper.state().inSwap).to.eql(undefined)
    })
  });
});
