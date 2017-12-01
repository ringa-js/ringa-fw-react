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
      <Button label="Set value programmatically" onClick={this.setValueProgrammatically} />
      <SubmitButton label="Submit"
                    onClick={this.formSubmit_onClickHandler} />
    </Form>;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  formSubmit_onClickHandler(event, formModel) {
    console.log('Submitted!', formModel.nameInput.value);
  }

  onChangeHandler(event, value) {
    this.setState({
      value
    });
  }

  setValueProgrammatically() {
    this.setState({
      value: ''
    });

    this.formModel.dispatch('forceValidate');
  }
}