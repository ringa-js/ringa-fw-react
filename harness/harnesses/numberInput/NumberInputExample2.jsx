import React from 'react';

import {Model} from 'ringa';
import {watch} from 'react-ringa';

import {NumberInput, RingaComponent, Button} from '../../../src/index';

const NumberModel = Model.construct('NumberModel', ['number']);

class NumberInputExample2 extends RingaComponent {
  constructor() {
    super();

    watch(this, new NumberModel(), ['number']);
  }

  render() {
    const {numberModel} = this.state;

    return <div>
      <NumberInput model={numberModel}
                   modelField="number" />
      The number you chose is: {numberModel.number}
      <Button label="Reset to 0" onClick={this.reset_onClickHandler} />
    </div>;
  }

  reset_onClickHandler() {
    this.state.numberModel.number = 0;
  }
}

export default NumberInputExample2;
