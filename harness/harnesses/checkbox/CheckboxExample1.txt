import React from 'react';
import {Checkbox, RingaComponent} from '../../../src/index';

class CheckboxExample1 extends RingaComponent {
  constructor() {
    super();
  }

  render() {
    return <div>
      <label>Change and watch the browser console</label>
      <Checkbox onChange={this.checkbox_onChangeHandler} />
    </div>;
  }

  checkbox_onChangeHandler({checked}) {
    console.log('Value has changed to:', checked);
  }
}

export default CheckboxExample1;
