import React from 'react';

import {RingaComponent,
        Form,
        FormItem,
        TextInput,
        Button,
        FormModel,
        SubmitButton} from '../../../src/index';

let ranIx = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

export default class FormForceValidateExample extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor() {
    super();

    this.formModel = new FormModel();
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    return <Form model={this.formModel}>
      <FormItem>
        <label>Name</label>
        <TextInput id="name"
                   required />
      </FormItem>
      <FormItem>
        <label>Name</label>
        <TextInput id="age"
                   required />
      </FormItem>
      <Button label="Set random values" onClick={this.setRandomValues} />
      <Button label="Clear" onClick={this.clear} />
      <SubmitButton label="Submit" />
    </Form>;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  onChangeHandler(event, value) {
    this.setState({
      value
    });
  }

  setRandomValues() {
    let firstNames = ['Jarod', 'Willem', 'Alina', 'Ashton', 'Sandra'];
    let lastNames = ['Smith', 'Nordstrom', 'Helström', 'Ashcroft', 'Sanders'];

    let name = ranIx(firstNames) + ' ' + ranIx(lastNames);

    this.formModel.setValue('name', name);
    this.formModel.setValue('age', Math.round(Math.random() * 80 + 10));
  }

  clear() {
    this.formModel.clear();
  }
}