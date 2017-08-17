import React from 'react';
import { mount, shallow } from 'enzyme';

import Sound from 'models/Sound';
import SearchResults from 'components/SearchResults';

describe('<SearchResults/>', function () {
  const sounds = [
    new Sound({ name: 'Cow', path: 'cow.mp3' }),
    new Sound({ name: 'Dog', path: 'dog.mp3' })
  ];

  const wrapper = shallow(<SearchResults onSelect={()=>{}} sounds={sounds} />);

  it('renders all sounds in `sounds` prop', function () {
    const searchResultsValues = wrapper.find('.search-result').map((o) => (
      { name: o.text(), path: o.props()['data-path'] }
    ))
    expect(searchResultsValues).to.eql(sounds);
  });

  it('renders keys for option elements', function () {
    const searchResultsKeys = wrapper.find('.search-result').map((o) => o.key())
    const soundPaths = sounds.map((sound) => sound.path)
    expect(searchResultsKeys).to.eql(soundPaths)
  });
});
