import React from 'react';

import RingaComponent from '../RingaComponent';
import Button from '../input/Button';

import FormModel from '../form/FormModel';

import {depend, dependency} from "react-ringa";

export default class SubmitButton extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    depend(this, dependency(FormModel, 'valid'));
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {valid} = this.state;

    return <Button enabled={valid} {...this.props} onClick={this.onClickHandler} />;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  onClickHandler() {
    const {formModel} = this.state;
    const {onClick} = this.props;

    if (onClick) {
      onClick(event, formModel);
    }
  }
}