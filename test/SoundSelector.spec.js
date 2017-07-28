import React from 'react';
import { mount, shallow } from 'enzyme';

import SoundSelector from '../src/client/app/components/SoundSelector.jsx';

describe('<SoundSelector/>', function () {
  const testFunction = () => { console.log('bam!') };
  const wrapper = shallow(<SoundSelector sound="birds.wav" onSoundChange={testFunction} />);

  it('renders 2 options with different sounds', function () {
    expect(wrapper.find('option')).to.have.length(2);
  });

  it('passes `sound` prop to value of select', function () {
    expect(wrapper.props().value).to.be.eql('birds.wav');
  });

  it('passes `onSoundChange` prop to onChange of select', function () {
    expect(wrapper.props().onChange).to.be.eql(testFunction);
  });
});
