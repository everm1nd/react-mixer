import React from 'react';
import { mount, shallow } from 'enzyme';

import Slider from 'components/Slider';

describe('<Slider/>', function () {
  const onChangeSpy = sinon.spy();
  const wrapper = shallow(<Slider onChange={onChangeSpy} />);

  it('renders one range input', function () {
    expect(wrapper.find('input[type="range"]')).to.have.length(1);
  });

  it('calls `onChange` function when value changes', function () {
    wrapper.find('input').simulate('change', {
      target: { position: 0.6 } }
    );
    expect(onChangeSpy).to.have.been.called;
  });
});
