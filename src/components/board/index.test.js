import React from 'react';
import { render, screen } from '@testing-library/react';
import { Board } from '.';
import configureStore from '../../store';
import { Provider } from 'react-redux';
import { mount, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { useSelector, useDispatch } from 'react-redux';
import {Square} from '../square/Square';

configure({ adapter: new Adapter() })
const wrapper = mount(<Provider store={configureStore()}><Board /></Provider>)

describe('Board component', () => {
  it('should display X as first player', () => {
    expect(wrapper.find('.page-title').text()).toEqual('Player X');
  })

  it('should create 9 Square components', () => {
  	expect(wrapper.find(Square).length).toEqual(9);
  })

})
