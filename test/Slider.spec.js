import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Slider from '../src/client/app/components/Slider.jsx';

describe('<Slider/>', function () {
  const testFunction = () => { console.log('bam!') };
  const wrapper = shallow(<Slider onChange={testFunction} />);

  it('renders one range input', function () {
    expect(wrapper.find('input[type="range"]')).to.have.length(1);
  });

  it.skip('passes `onChange` prop to onChange of button', function () {
    expect(wrapper.props().onChange).to.be.eql(testFunction);
  });
});
