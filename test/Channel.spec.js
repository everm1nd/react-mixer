import React from 'react';
import { mount, shallow } from 'enzyme';

const createHowlStub = () => {
  let HowlStub = sinon.stub();
  HowlStub.prototype.play = sinon.stub().returns(true);
  HowlStub.prototype.unload = sinon.stub().returns(true);
  HowlStub.prototype.volume = sinon.stub().returns(true);
  HowlStub.prototype.loop = sinon.stub().returns(true);
  HowlStub.prototype.playing = sinon.stub().returns(true);
  return HowlStub;
};

describe('<Channel/>', function () {
  const HowlStub = createHowlStub();
  const Channel = proxyquire.noCallThru().load(process.cwd() + '/src/client/app/components/Channel.jsx',
    { 'howler': { 'Howl': HowlStub } }
  ).default;
  const wrapper = shallow(<Channel sound='sound.wav' volume={0.5} />);

  it('renders one Slider', function () {
    expect(wrapper.find('Slider')).to.have.length(1);
  });

  it('renders one LoopButton', function () {
    expect(wrapper.find('LoopButton')).to.have.length(1);
  });

  it('renders one SoundSelector', function () {
    expect(wrapper.find('SoundSelector')).to.have.length(1);
  });

  it('gets initialized with correct state', function () {
    expect(wrapper.state()).to.include({
      path: 'sound.wav',
      volume: 0.5
    });
  });

  it('sets volume to 0.8 if it is not set in constructor', function () {
    const wrapper = shallow(<Channel sound='sound.wav' />);
    expect(wrapper.state().volume).to.eql(0.8);
  });

  context('when user changes a sound', function () {
    const wrapper = shallow(<Channel sound='rain.wav' />);
    wrapper.find('SoundSelector').props().onSoundChange({ target: { value: 'birds.wav' } });

    it('unloads an old sound', function() {
      expect(HowlStub.prototype.unload).to.have.been.called;
    });

    it('changes sound to a new one', function () {
      expect(wrapper.state().path).to.eql('birds.wav');
    })
  });

  context('when user changes volume', function() {
    const wrapper = shallow(<Channel volume={0.6} />);
    wrapper.find('Slider').props().onChange(0.85);

    it('triggers volume change in sound object', function() {
      expect(HowlStub.prototype.volume).to.have.been.called;
    });

    it('updates volume in Channel state', function() {
      expect(wrapper.state().volume).to.eql(0.85);
    });
  });

  context('when user clicks on Loop button', function() {
    const wrapper = shallow(<Channel volume={0.6} />);
    const clickLoopButton = () => { wrapper.find('LoopButton').props().onClick() };

    it('toogles sound loop', function() {
      // loop was active, then we click toogleLoop button
      clickLoopButton();
      expect(HowlStub.prototype.loop).to.have.been.calledWith(false);
      // now let's mock it ask inactive and click it again
      HowlStub.prototype.loop = sinon.stub().returns(false);
      clickLoopButton();
      expect(HowlStub.prototype.loop).to.have.been.calledWith(true);
    });

    it('restarts sound if it was not playing', function() {
    });

    it('does not restart sound if LOOP_AUTORESTART is false', function() {
    });
  });
});
