import React from "react";
import { Square } from "./Square";
import { mount, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

const mockOnClick = jest.fn();
const props = {
  value: 'X',
  x: 0,
  y: 0,
  onClick: mockOnClick
}
configure({ adapter: new Adapter() })
const wrapper = mount(<Square {...props} />)

describe('Square component', () => {
  it('should render a button', () => {
    expect(wrapper.find('button'))
  })

  it('should show correct value as text in button', () => {
  	expect(wrapper.find('button').text()).toEqual(props.value);
  })
})