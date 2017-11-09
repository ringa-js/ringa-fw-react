import React from 'react';
import {TextInput, RingaComponent} from '../../../src/index';

class TextInputExample1 extends RingaComponent {
  constructor() {
    super();
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    return <TextInput onChange={this.textInput_onChangeHandler} />;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  textInput_onChangeHandler(event, value) {
    console.log('Value has changed to:', value);
  }
}

export default TextInputExample1;
