import React from 'react';
import { mount, shallow } from 'enzyme';

describe('<Channel/>', function () {
  let wrapper;

  beforeEach(() => {
    var HowlStub = sinon.stub();
    HowlStub.prototype.play = sinon.stub().returns(true);
    const Channel = proxyquire.noCallThru().load(process.cwd() + '/src/client/app/components/Channel.jsx',
      { 'howler': { 'Howl': HowlStub } }
    ).default;
    wrapper = shallow(<Channel />);
  })

  it('renders one Slider', function () {
    expect(wrapper.find('Slider')).to.have.length(1);
  });

  it('renders one LoopButton', function () {
    expect(wrapper.find('LoopButton')).to.have.length(1);
  });

  it('renders one SoundSelector', function () {
    expect(wrapper.find('SoundSelector')).to.have.length(1);
  });
});
