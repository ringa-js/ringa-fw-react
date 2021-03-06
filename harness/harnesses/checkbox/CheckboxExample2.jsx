import React from 'react';

import {Model} from 'ringa';
import {watch} from 'react-ringa';

import {Checkbox, RingaComponent, Button} from '../../../src/index';

const SelectedModel = Model.construct('SelectedModel', ['selected']);

class CheckboxExample2 extends RingaComponent {
  constructor() {
    super();

    watch(this, new SelectedModel(), ['selected']);
  }

  render() {
    const {selectedModel} = this.state;

    return <div>
      <Checkbox model={selectedModel}
                modelField="selected" />

      Selected? {selectedModel.selected ? 'Yes' : 'No'}

      <Button label="Uncheck" onClick={this.uncheck_onClickHandler} />
      <Button label="Check" onClick={this.check_onClickHandler} />
    </div>;
  }

  uncheck_onClickHandler() {
    this.state.selectedModel.selected = false;
  }

  check_onClickHandler() {
    this.state.selectedModel.selected = true;
  }
}

export default CheckboxExample2;
