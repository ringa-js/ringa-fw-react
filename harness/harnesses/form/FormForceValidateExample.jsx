import React from 'react';

import {RingaEvent} from 'ringa';

import {RingaComponent,
        Form,
        FormItem,
        TextInput,
        Button,
        FormModel,
        SubmitButton} from '../../../src/index';

export default class FormForceValidateExample extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor() {
    super();

    this.formModel = new FormModel();

    this.state = {
      value: 'Hey!'
    };
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    return <Form model={this.formModel}>
      <FormItem>
        <label>Name</label>
        <TextInput id="nameInput"
                   value={this.state.value}
                   onChange={this.onChangeHandler}
                   required={true} />
      </FormItem>
      <Button label="Force Invalid" onClick={this.setValueProgrammatically} />
      <Button label="Clear" onClick={this.clearValidation} />
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

  clearValidation() {
    this.formModel.clear();
  }

  setValueProgrammatically() {
    this.setState({
      value: ''
    });

    // 'forceValidate: runs validation on the next frame
    // 'forceImmediateValidate': runs immediately, but keep in mind if you have updated state or something similar
    // it may take a full frame for your updates to take effect in the relevant inputs
    this.formModel.dispatch('forceValidate', {
      updateIndicators: true
    });
  }
}