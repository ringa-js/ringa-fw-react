import React from 'react';

import RingaComponent from '../RingaComponent';

import {attach} from 'react-ringa';

import FormController from './FormController';

export default class Form extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.formController = new FormController(props.model);

    this.attach(this.formController);
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.model !== this.props.model && this.props.model) {
      this.formController.removeModel(this.props.model);
      this.formController.addModel(nextProps.model);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    this.dispatch(FormController.UNREGISTER_ALL);
  }

  render() {
    return <div className={this.calcClassnames('form')}>{this.props.children}</div>;
  }
}