import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import SoundSelector from '../src/client/app/components/SoundSelector.jsx';

describe('<SoundSelector/>', function () {
  it('renders 2 options with different sounds', function () {
    const wrapper = shallow(<SoundSelector/>);
    expect(wrapper.find('option')).to.have.length(2);
  });

  it('passes `sound` prop to value of select', function () {
    const wrapper = shallow(<SoundSelector sound="birds.wav"/>);
    expect(wrapper.props().value).to.be.eql('birds.wav');
  });

  it('passes `onSoundChange` prop to onChange of select', function () {
    const onSoundChange = () => { console.log('bam!') };
    const wrapper = shallow(<SoundSelector onSoundChange={onSoundChange} />);
    expect(wrapper.props().onChange).to.be.eql(onSoundChange);
  });
});
