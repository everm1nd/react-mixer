import React from 'react';
import { mount, shallow } from 'enzyme';

import LoopButton from '../../../src/client/app/components/LoopButton.jsx';

describe('<LoopButton/>', function () {
  const testFunction = () => { console.log('bam!') };
  const wrapper = shallow(<LoopButton onClick={testFunction} />);

  it('renders one button', function () {
    expect(wrapper.find('input[type="button"]')).to.have.length(1);
  });

  it('passes `onClick` prop to onClick of button', function () {
    expect(wrapper.props().onClick).to.be.eql(testFunction);
  });
});
