import React from 'react';
import { mount, shallow } from 'enzyme';

import App from 'components/App';

describe('<App/>', function () {
  const wrapper = shallow(<App />);

  it('renders a title', function () {
    expect(wrapper.find('p').text()).to.eql('React Mixer');
  });

  it('renders two channels', function () {
    expect(wrapper.find('Channel')).to.have.length(2);
  });

  it('renders a search field', function () {
    expect(wrapper.find('SearchField')).to.have.length(1);
  });

  it('pass handleSearch function to SearchField', function () {
    expect(wrapper.find('SearchField').props().onSearch).to.eql(App.prototype.handleSearch);
  });
});
