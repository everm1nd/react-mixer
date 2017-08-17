import React from 'react';
import { mount, shallow } from 'enzyme';

import App from 'components/App';
import Sound from 'models/Sound';

describe('<App/>', function () {
  let wrapper = shallow(<App />);

  it('renders a title', function () {
    expect(wrapper.find('p').text()).to.eql('React Mixer');
  });

  it('renders all sounds from Sound.all() as separate channels', function () {
    expect(wrapper.find('Channel')).to.have.length(Sound.all().length);
  });

  it('saves all available sounds to .sounds', () => {
    expect(wrapper.state().sounds).to.eql(Sound.all())
  })

  describe('.handleSearch', () => {
    it('changes a query in state', () => {
      const query = 'some sound name'
      wrapper.instance().handleSearch({ target: { value: query } })
      expect(wrapper.state()).to.include({ query })
    })
  })

  describe('.handleSoundSwap', () => {
    beforeEach(() => { wrapper = shallow(<App />) });

    const swapChannel = (id) => {
      wrapper.instance().handleSoundSwap({ props: { id } })()
    }

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
});
