import React from 'react';
import { mount, shallow } from 'enzyme';

import Sound from 'models/Sound';
import SearchResults from 'components/SearchResults';

describe('<SearchResults/>', function () {
  const sounds = [
    new Sound({ name: 'Cow', path: 'cow.mp3', duration: 5.12 }),
    new Sound({ name: 'Dog', path: 'dog.mp3', duration: 10 })
  ];

  const wrapper = shallow(<SearchResults onSelect={()=>{}} sounds={sounds} />);

  it('renders all sounds in `sounds` prop', function () {
    expect(wrapper.find('.search-result')).to.have.length(sounds.length);
  });

  context('renders single result with proper values', () => {
    const result = wrapper.find('.search-result').first()
    const sound = sounds[0]

    it('sound name and duration', () => {
      expect(result.text()).to.eql(`${sound.name} (${sound.duration})`)
    })
  })

  it('renders keys for option elements', function () {
    const searchResultsKeys = wrapper.find('.search-result').map((o) => o.key())
    const soundPaths = sounds.map((sound) => sound.path)
    expect(searchResultsKeys).to.eql(soundPaths)
  });
});
