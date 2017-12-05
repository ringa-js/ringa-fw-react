import React from 'react';
import RingaComponent from '../RingaComponent';
import ValidatorRequired from '../validation/ValidatorRequired';
import FormController from '../form/FormController';

export default class FormInputBase extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props, props.id);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentDispatchReady() {
    super.componentDispatchReady();

    // It is possible nobody is actually using the FormController anywhere...
    if (FormController.REGISTER_FORM_ELEMENT) {
      this.dispatch(FormController.REGISTER_FORM_ELEMENT, {
        element: this
      }, true, true, false);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    // It is possible nobody is actually using the FormController anywhere...
    if (FormController.UNREGISTER_FORM_ELEMENT) {
      this.dispatch(FormController.UNREGISTER_FORM_ELEMENT, {
        element: this
      }, true, true, false);
    }
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  getTooltipMessage() {
    if (!this.state.valid && this.state.invalidReasons) {
      return this.state.invalidReasons.map(reason => reason.message).join('\n');
    }

    return undefined;
  }

  getTooltipOptions() {
    if (!this.state.valid) {
      return {
        classes: 'error',
        maxWidth: 400
      };
    }

    return undefined;
  }

  notifyFormOfValueChange(){
    if (FormController.VALUE_CHANGED) {
      this.dispatch(FormController.VALUE_CHANGED, {
        element: this,
      }, true, true, false);
    }
  }

  notifyFormOfValidChange(valid, invalidReasons) {
    if (FormController.VALID_CHANGED) {
      this.dispatch(FormController.VALID_CHANGED, {
        element: this,
        valid,
        invalidReasons
      }, true, true, false);
    }
  }
}
