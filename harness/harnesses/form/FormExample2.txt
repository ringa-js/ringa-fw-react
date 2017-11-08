import React from 'react';

import {RingaComponent,
        Form,
        FormItem,
        FormModel,
        FormMessage,
        TextInput,
        SubmitButton,
        ValidatorEmail,
        ValidatorRequired} from '../../../src/index';

export default class FormExample2 extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor() {
    super();

    this.formModel = new FormModel();

    this.formModel.valid = false;
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    return <Form model={this.formModel}>
      <FormItem>
        <label>Name</label>
        <TextInput required={true}/>
      </FormItem>
      <FormItem>
        <label>Email</label>
        <TextInput validators={[ValidatorEmail, ValidatorRequired]} />
      </FormItem>
      <FormItem>
        <label>Favorite Car</label>
        <TextInput />
      </FormItem>
      <FormMessage />
      <SubmitButton label="Submit" onClick={this.formSubmit_onClickHandler} />
    </Form>;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  formSubmit_onClickHandler() {
    console.log('Submitted!');

    this.formModel.message = 'Form has been submitted!';
  }
}