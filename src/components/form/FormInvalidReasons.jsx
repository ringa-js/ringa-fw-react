import React from 'react';

import RingaComponent from '../RingaComponent';

import FormModel from './FormModel';
import I18NModel from '../../models/I18NModel';

import {dependency} from "react-ringa";

export default class FormInvalidReasons extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.depend(
      dependency(FormModel, 'invalidReasons'),
      dependency(I18NModel, 'language')
    );
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {invalidReasons, invalidReasonRenderer = this.defaultInvalidReasonRenderer} = this.state;

    if (invalidReasons && invalidReasons.length) {
      return <div className={this.calcClassnames('invalid-reasons errors')}>
        {invalidReasons.map(this.)}
      </div>;
    }

    return <div className={this.calcClassnames('invalid-reasons empty')} />;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  defaultInvalidReasonRenderer(reason) {
    return <div className="reason">{reason}</div>;
  }
}