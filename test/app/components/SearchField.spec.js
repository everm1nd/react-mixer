import React from 'react';
import { mount, shallow } from 'enzyme';

import SearchField from '../../../src/client/app/components/SearchField.jsx';

describe('<SearchField/>', function () {
  const searchStub = sinon.stub();
  const wrapper = shallow(<SearchField onSearch={searchStub} />);
  const input = wrapper.find('input')

  beforeEach(() => searchStub.resetHistory())

  it('renders one input', function () {
    expect(input).to.have.length(1);
  });

  it('calls `onSearch` when Enter is pressed', function () {
    input.simulate('keyPress', {
      key: 'Enter',
      keyCode: 13,
      which: 13
    });
    expect(searchStub).to.have.been.called;
  });

  it('doesn\'t call `onSearch` when other key is pressed', function () {
    input.simulate('keyPress', {
      key: 'A',
      keyCode: 65,
      which: 65
    });
    expect(searchStub).to.not.have.been.called;
  });
});
