import { renderDuration } from 'lib/time'

describe('renderDuration', () => {
  it('renders duration in human format as minutes, seconds and millis (2 digits)', () => {
    expect(renderDuration(71.25901)).to.be.eql('01:11.26')
  });

  it('renders 0 seconds properly', () => {
    expect(renderDuration(0)).to.be.eql('00:00.00')
  });
});
