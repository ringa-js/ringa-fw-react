import React from 'react';
import {NumberInput, RingaComponent} from '../../../src/index';

class NumberInputExample1 extends RingaComponent {
  constructor() {
    super();
  }

  render() {
    return <div>
      <label>Pick a number and watch the browser console</label>
      <NumberInput onChange={this.numberInput_onChangeHandler} />
    </div>;
  }

  numberInput_onChangeHandler(event, value) {
    console.log('Value has changed to:', value);
  }
}

export default NumberInputExample1;
