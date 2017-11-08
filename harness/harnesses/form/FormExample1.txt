import React from 'react';

import {RingaComponent,
        Form,
        FormItem,
        TextInput,
        SubmitButton} from '../../../src/index';

export default class FormExample1 extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor() {
    super();
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    return <Form>
      <FormItem>
        <label>Name</label>
        <TextInput />
      </FormItem>
      <SubmitButton label="Submit"
                    onClick={this.formSubmit_onClickHandler} />
    </Form>;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  formSubmit_onClickHandler() {
    console.log('Submitted!');
  }
}