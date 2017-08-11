import React from 'react';
import { mount, shallow } from 'enzyme';

const resetHowlMethodStubs = (howlStub) => {
  howlStub.prototype.play = sinon.stub().returns(true);
  howlStub.prototype.unload = sinon.stub().returns(true);
  howlStub.prototype.volume = sinon.stub().returns(true);
  howlStub.prototype.loop = sinon.stub().returns(true);
  howlStub.prototype.playing = sinon.stub().returns(true);
}

const createHowlStub = () => {
  let HowlStub = sinon.stub();
  resetHowlMethodStubs(HowlStub);
  return HowlStub;
};

describe('<Channel/>', function () {
  let HowlStub = createHowlStub();
  const Channel = proxyquire.noCallThru().load(process.cwd() + '/src/client/app/components/Channel',
    { 'howler': { 'Howl': HowlStub } }
  ).default;
  const wrapper = shallow(<Channel sound='sound.wav' volume={0.5} />);

  beforeEach(() => { resetHowlMethodStubs(HowlStub) })

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
    beforeEach(() => {
      wrapper.find('SoundSelector').props().onSoundChange({ target: { value: 'birds.wav' } });
    })

    it('unloads an old sound', function() {
      expect(HowlStub.prototype.unload).to.have.been.called;
    });

    it('changes sound to a new one', function () {
      expect(wrapper.state().path).to.eql('birds.wav');
    })
  });

  context('when user changes volume', function() {
    beforeEach(() => {
      wrapper.find('Slider').props().onChange(0.85);
    });

    it('triggers volume change in sound object', function() {
      expect(HowlStub.prototype.volume).to.have.been.called;
    });

    it('updates volume in Channel state', function() {
      expect(wrapper.state().volume).to.eql(0.85);
    });
  });

  context('when user clicks on Loop button', function() {
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
      HowlStub.prototype.playing = sinon.stub().returns(false);
      clickLoopButton();
      expect(HowlStub.prototype.play).to.have.been.called;
    });

    it('does not restart sound if it was playing already', function() {
      HowlStub.prototype.playing = sinon.stub().returns(true);
      clickLoopButton();
      expect(HowlStub.prototype.play).to.not.have.been.called;
    });
  });
});
