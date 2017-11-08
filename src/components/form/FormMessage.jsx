import React from 'react';

import RingaComponent from '../RingaComponent';

import FormModel from './FormModel';

import {depend, dependency} from "react-ringa";

export default class FormMessage extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    depend(this, dependency(FormModel, ['message', 'error']));
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {message, error} = this.state;

    if (error) {
      return <div className={this.calcClassnames('submit-message error')}>{error}</div>;
    }

    if (message) {
      return <div className={this.calcClassnames('submit-message')}>{message}</div>;
    }

    return <div className={this.calcClassnames('submit-message empty')} />;
  }
}