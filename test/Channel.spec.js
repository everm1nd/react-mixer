import React from 'react';
import { mount, shallow } from 'enzyme';

const createHowlStub = () => {
  let HowlStub = sinon.stub();
  HowlStub.prototype.play = sinon.stub().returns(true);
  return HowlStub;
};

describe('<Channel/>', function () {
  const Channel = proxyquire.noCallThru().load(process.cwd() + '/src/client/app/components/Channel.jsx',
    { 'howler': { 'Howl': createHowlStub() } }
  ).default;
  const wrapper = shallow(<Channel />);

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
