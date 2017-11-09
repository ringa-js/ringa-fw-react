import React from 'react';
import {TextInput, RingaComponent} from '../../../src/index';

class TextInputExample1 extends RingaComponent {
  constructor() {
    super();
  }

  render() {
    return <TextInput onChange={this.textInput_onChangeHandler} placeholder="Enter data here and watch the console..." />;
  }

  textInput_onChangeHandler(event, value) {
    console.log('Value has changed to:', value);
  }
}

export default TextInputExample1;
