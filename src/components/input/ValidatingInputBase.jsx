import React from 'react';
import RingaComponent from '../RingaComponent';
import ValidatorRequired from '../validation/ValidatorRequired';
import FormController from '../form/FormController';
import I18NModel from '../../models/I18NModel';
import FormInputBase from '../form/FormInputBase';

import {dependency} from 'react-ringa';

export default class ValidatingInputBase extends FormInputBase {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props, props.id);

    this.state = Object.assign({}, this.state);

    this.processProps(props, true);

    this.valid = true;

    this.depend(dependency(I18NModel, 'language'));
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  get watchMouseEvents() {
    return true;
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentWillReceiveProps(nextProps) {
    this.processProps(nextProps, false);
  }

  render() {
    return <div className="validating-input-base">{this.props.children}</div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  processProps(props, firstPass) {
    let controlled;
    let value;

    if (props.value !== undefined) {
      controlled = true;
      value = props.value;
    } else if (props.model && props.modelField) {
      controlled = true;
      let val;
      val = props.model[props.modelField];

      if (val !== undefined) {
        value = val.toString();
      } else {
        value = '';
      }
    } else {
      value = undefined;
    }

    let n = firstPass ? {
      value: controlled ? value || '' : undefined,
      controlled,
      valid: true
    } : {
      value: controlled ? value || '' : undefined,
      controlled
    };

    if (!this.mounted) {
      this.state = Object.assign(this.state, n);
    } else {
      this.setState(n);
    }

    if (!this.validatorsInitialized) {
      this.setupValidators(props);

      this.validatorsInitialized = true;
    }
  }

  tryUpdateModel(value) {
    const {model, modelField} = this.props;

    if (model && modelField) {
      model[modelField] = value;

      this.setState({
        value
      });
    }
  }

  /**
   * This method is designed to be called in the subclass constructor AFTER state has been set!
   *
   * See TextInput for an example.
   *
   * @param props The properties passed into the constructor.
   */
  setupValidators(props) {
    let validators = props.validators || [];

    if (props.required) {
      validators.unshift(new ValidatorRequired());
    }

    validators = validators.map(validator => {
      if (typeof validator === 'function') {
        return new validator();
      }

      return validator;
    });

    this.state = Object.assign({
      validators
    }, this.state);
  }

  /**
   * Validates the value using the validators on this component. Returns false if everything is valid, returns an
   * array of reasons if anything is invalid.
   *
   * @param value False if valid. Array of reasons if invalid.
   * @returns {*}
   */
  validate(value, dispatchEvents = true, updateIndicators = true) {
    let {validators} = this.state;
    let {model, modelField} = this.props;

    if (model && modelField && model.propertyOptions[modelField].validators) {
      validators = model.propertyOptions[modelField].validators;
    }

    let invalidReasons = [];

    validators.forEach(validator => {
      let result = validator.validate(value, this.state.i18NModel);

      if (result) {
        invalidReasons.push(result);
      }
    });

    if (invalidReasons.length) {
      this.valid = false;
      this.invalidReasons = invalidReasons;

      if (dispatchEvents) {
        this.notifyFormOfValidChange(false, invalidReasons);
      }

      if (updateIndicators) {
        this.setState({
          valid: false,
          invalidReasons
        });
      }

      return invalidReasons;
    }

    this.valid = true;
    this.invalidReasons = undefined;

    if (dispatchEvents) {
      this.notifyFormOfValidChange(true);
    }

    if (updateIndicators) {
      this.setState({
        valid: true,
        invalidReasons: undefined
      });
    }

    return false;
  }

  onChangeHandler() {
    this.notifyFormOfValueChange();
  }
}
