import React from 'react';
import TextInput from './TextInput';
import classnames from 'classnames';

import UP from '../../images/up.svg';
import DOWN from '../../images/down.svg';

export default class NumberInput extends TextInput {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.state = Object.assign({
      maxButtonDisabled: false,
      minButtonDisabled: false
    }, this.state);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    let {label, classes, placeholder, defaultValue, required, valid = true,
      requiredMessage = '*', multiline = false} = this.props;

    let {value, controlled} = this.state;

    let labelNode = null, requiredNode = null;

    if (label) {
      labelNode = <label>{label}</label>
    }

    if (required) {
      requiredNode = <div className="required-indicator">{requiredMessage}</div>;
    }

    let cn = this.calcClassnames('number-input', {
      required,
      invalid: !this.state.valid || !valid
    }, classes);

    let input = <input type="text"
                       ref="input"
                       id={this.id}
                       value={controlled ? value : undefined}
                       placeholder={placeholder}
                       defaultValue={controlled ? undefined : defaultValue}
                       onKeyPress={this.onKeyPressHandler}
                       onChange={this.onChangeHandler}
                       onFocus={this.onFocusHandler}
                       onBlur={this.onBlurHandler}
                       onClick={this.onClickHandler}/>;

    let buttons = <div className="buttons">
      <div className="up" disabled={this.state.maxButtonDisabled} onClick={this.up_clickHandler}><img src={UP}/></div>
      <div className="down" disabled={this.state.minButtonDisabled} onClick={this.down_clickHandler}><img src={DOWN}/></div>
    </div>;

    return <div className={cn}>
      {labelNode}
      {input}
      {buttons}
      {requiredNode}
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  normalize(num) {
    num = (typeof num === 'string') ? parseFloat(num) : num;

    let {emptyValue = 0, min, max} = this.props;

    if (min !== undefined) {
      emptyValue = min;
    }

    num = isNaN(num) ? emptyValue : num;

    if (min !== undefined) {
      num = Math.max(min, num);
      if(num === min){
        this.state.minButtonDisabled = true;
      }else{
        this.state.minButtonDisabled = false;
      }
    }

    if (max !== undefined) {
      num = Math.min(max, num);
      if(num === max){
        this.state.maxButtonDisabled = true;
      }else{
        this.state.maxButtonDisabled = false;
      }
    }

    return num;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  onChangeHandler(event) {
    const {onChange, model, modelField, filter} = this.props;

    this.refs.input.value = this.normalize(this.refs.input.value.replace(/[^0-9\.\,\-]/g, ''));

    return super.onChangeHandler(event);
  }

  up_clickHandler(event) {
    const {upClickHandler, step = 1} = this.props;

    if (upClickHandler) {
      upClickHandler();
    } else {
      let num = this.normalize(parseFloat(this.refs.input.value));

      this.refs.input.value = this.normalize(num + step);

      super.onChangeHandler();
    }
  }

  down_clickHandler(event) {
    const {downClickHandler, step = 1} = this.props;

    if (downClickHandler) {
      downClickHandler();
    } else {
      let num = this.normalize(parseFloat(this.refs.input.value));

      this.refs.input.value = this.normalize(num - step);



      super.onChangeHandler();
    }
  }

  onKeyPressHandler(event) {
    if (event.keyCode == '38') {
      this.up_clickHandler(event);
    } else if (event.keyCode == '40') {
      this.down_clickHandler(event);
    }
  }
}
