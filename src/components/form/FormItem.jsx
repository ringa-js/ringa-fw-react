import React from 'react';

import RingaComponent from '../RingaComponent';

import FormModel from '../form/FormModel';

import {depend, dependency} from "react-ringa";

export default class FormItem extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    depend(this, dependency(FormModel, ['change', 'elements', 'elementsById']));
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {elements, elementsById} = this.state;
    const {children, elementId} = this.props;

    let valid = elementsById && elementsById[elementId] ? elementsById[elementId].valid : false;

    return <div className={this.calcClassnames('form-item', {
      valid
    })}>{children}</div> ;
  }
}