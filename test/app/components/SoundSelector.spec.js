import React from 'react';
import { mount, shallow } from 'enzyme';

import Sound from '../../../src/client/app/models/Sound';
import SoundSelector from '../../../src/client/app/components/SoundSelector.jsx';

describe('<SoundSelector/>', function () {
  const testFunction = () => { console.log('bam!') };
  const wrapper = shallow(<SoundSelector sound="birds.wav" onSoundChange={testFunction} />);

  it('renders all sounds returned by Sound.search()', function () {
    const optionValues = wrapper.find('option').map((o) => (
      { name: o.text(), path: o.props().value }
    ))
    expect(optionValues).to.eql(Sound.search());
  });

  it('passes `sound` prop to value of select', function () {
    expect(wrapper.props().value).to.be.eql('birds.wav');
  });

  it('passes `onSoundChange` prop to onChange of select', function () {
    expect(wrapper.props().onChange).to.be.eql(testFunction);
  });
});
