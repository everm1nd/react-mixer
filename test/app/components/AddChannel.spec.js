import React from 'react';
import { mount, shallow } from 'enzyme';

import AddChannel from 'components/AddChannel';

describe('<AddChannel/>', function () {
  const onClickInnerSpy = sinon.spy()
  const onClickSpy = sinon.spy(() => onClickInnerSpy)
  const wrapper = shallow(<AddChannel id={1} onClick={onClickSpy} />);
  const input = wrapper.find('input[type="button"]');

  it('renders one button', function () {
    expect(input).to.have.length(1);
  });

  it('unwraps `onClick` function passing channelId prop', () => {
    expect(onClickSpy).to.have.been.calledWithMatch({ props: { id: 1 } })
  })

  it('assigns unwrapped `onClick` to onClick event of button', function () {
    expect(input.props().onClick).to.be.eql(onClickInnerSpy);
  });

  context('when in swap state', () => {
    it('changes a background', () => {
      const wrapper = shallow(<AddChannel inSwap={true} id={1} onClick={onClickSpy} />);
      expect(wrapper.find('.channel').props().style.backgroundColor).to.eql('#ffe0b2')
    })
  })
});
