import React from 'react';
import { mount, shallow } from 'enzyme';
import Sound from 'models/Sound';

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

describe('<Channel/>', () => {
  let HowlStub = createHowlStub();
  const Channel = proxyquire.noCallThru().load(process.cwd() + '/src/client/app/components/Channel',
    { 'howler': { 'Howl': HowlStub } }
  ).default;
  const onSoundSwapStub = () => () => ({});
  const createChannelShallow = (props) => (
    shallow(<Channel id={0} onSoundSwap={onSoundSwapStub} {...props} />)
  );
  const sound = new Sound({ name: 'Dog', path: 'dog.mp3' })
  const wrapper = createChannelShallow({ sound, volume: 0.5 })

  beforeEach(() => { resetHowlMethodStubs(HowlStub) })

  it('renders one Slider', () => {
    expect(wrapper.find('Slider')).to.have.length(1);
  });

  it('renders one LoopButton', () => {
    expect(wrapper.find('LoopButton')).to.have.length(1);
  });

  it('renders name of the sound', () => {
    expect(wrapper.find('.sound-name').text()).to.eql(wrapper.state().sound.name)
  })

  it('gets initialized with correct state', () => {
    expect(wrapper.state()).to.include({
      sound,
      volume: 0.5
    });
  });

  it('sets volume to 0.8 if it is not set in constructor', () => {
    const wrapper = createChannelShallow({ sound });
    expect(wrapper.state().volume).to.eql(0.8);
  });

  context('when user changes a sound', () => {
    const wrapper = createChannelShallow({ sound });
    const newSound = new Sound({ name: 'Cow', path: 'cow.mp3' })
    beforeEach(() => {
      wrapper.setProps({ sound: newSound })
    })

    it('unloads an old sound', () => {
      expect(HowlStub.prototype.unload).to.have.been.called;
    });

    it('changes sound to a new one', () => {
      expect(wrapper.state().sound).to.eql(newSound);
    })
  });

  context('when user selects the same sound', () => {
    const wrapper = createChannelShallow({ sound });
    beforeEach(() => {
      wrapper.setProps({ sound })
    })

    it('doesn\'t unload the sound', () => {
      expect(HowlStub.prototype.unload).to.not.have.been.called;
    });
  })

  context('when user changes volume', () => {
    beforeEach(() => {
      wrapper.find('Slider').props().onChange(0.85);
    });

    it('triggers volume change in sound object', () => {
      expect(HowlStub.prototype.volume).to.have.been.called;
    });

    it('updates volume in Channel state', () => {
      expect(wrapper.state().volume).to.eql(0.85);
    });
  });

  context('when user clicks on Loop button', () => {
    const clickLoopButton = () => { wrapper.find('LoopButton').props().onClick() };

    it('toogles sound loop', () => {
      // loop was active, then we click toogleLoop button
      clickLoopButton();
      expect(HowlStub.prototype.loop).to.have.been.calledWith(false);
      // now let's mock it ask inactive and click it again
      HowlStub.prototype.loop = sinon.stub().returns(false);
      clickLoopButton();
      expect(HowlStub.prototype.loop).to.have.been.calledWith(true);
    });

    it('restarts sound if it was not playing', () => {
      HowlStub.prototype.playing = sinon.stub().returns(false);
      clickLoopButton();
      expect(HowlStub.prototype.play).to.have.been.called;
    });

    it('does not restart sound if it was playing already', () => {
      HowlStub.prototype.playing = sinon.stub().returns(true);
      clickLoopButton();
      expect(HowlStub.prototype.play).to.not.have.been.called;
    });
  });

  context('when in swap state', () => {
    it('changes a background', () => {
      const wrapper = createChannelShallow({ sound, volume: 0.5, inSwap: true })
      expect(wrapper.find('.channel').props().style.backgroundColor).to.eql('#ffe0b2')
    })
  })
});
