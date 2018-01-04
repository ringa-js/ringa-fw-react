import React from 'react';
import ValidatingInputBase from './ValidatingInputBase';

export default class TextInput extends ValidatingInputBase {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props, props.id);

    this.setupValidators(props);
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  get value() {
    return this.refs.input ? this.refs.input.value : '';
  }

  set value(value) {
    this.refs.input.value = value ? value : '';

    this.onChangeHandler();
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  revalidate(dispatchEvents = false, updateIndicators = false) {
    this.validate(this.refs.input.value, dispatchEvents, updateIndicators);
  }

  componentDispatchReady() {
    super.componentDispatchReady();

    const {focusOnMount} = this.props;

    if (focusOnMount) {
      this.refs.input.focus();
    }

    this.validate(this.refs.input.value, true, false);
  }

  render() {
    let {label, classes, placeholder, defaultValue, required, valid = true, readOnly = false,
          requiredIndicator = this.renderDefaultRequiredIndicator, multiline = false, editOnClick = false, type = 'text'} = this.props;

    let {value, controlled, tempValue} = this.state;

    let labelNode = null, requiredNode = null;

    if (label) {
      labelNode = <label>{label}</label>;
    }

    if (required) {
      requiredNode = requiredIndicator();
    }

    let cn = this.calcClassnames('text-input', {
      required,
      invalid: !this.state.valid || !valid,
      editonclick:editOnClick
    }, classes);

    let input;

    if (multiline) {
      input = <textarea ref="input"
                        id={this.id}
                        value={controlled ? tempValue === undefined ? value : tempValue : undefined}
                        placeholder={placeholder}
                        defaultValue={controlled ? undefined : defaultValue}
                        onKeyPress={this.onKeyPressHandler}
                        onChange={this.onChangeHandler}
                        onFocus={this.onFocusHandler}
                        onBlur={this.onBlurHandler}
                        onClick={this.onClickHandler}
                        readOnly={readOnly}
                        />
    } else {
      input = <input type={type}
                     ref="input"
                     id={this.id}
                     value={controlled ? tempValue === undefined ? value : tempValue : undefined}
                     placeholder={placeholder}
                     defaultValue={controlled ? undefined : defaultValue}
                     onKeyPress={this.onKeyPressHandler}
                     onChange={this.onChangeHandler}
                     onFocus={this.onFocusHandler}
                     onBlur={this.onBlurHandler}
                     onClick={this.onClickHandler}
                     readOnly={readOnly}/>;
    }

    return <div className={cn}>
            {labelNode}
            {input}
            {requiredNode}
          </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  clear() {
    this.value = '';

    this.onChangeHandler();

    this.resetValidation();
  }

  renderDefaultRequiredIndicator() {
    return <div className="required-indicator">
      <div className="circle" />
    </div>;
  }

  getTooltipMessage() {
    let message;

    message = super.getTooltipMessage();

    if (!message && this.props.showTextTooltip) {
      return this.refs.input.value;
    }

    return message;
  }

  focus() {
    this.refs.input.focus();
  }

  handleInputChange() {
    const {filter} = this.props;

    if (filter) {
      if (filter === 'number') {
        this.refs.input.value = this.refs.input.value.replace(/[^0-9\.\,\-]/g, '');
      } else {
        this.refs.input.value = filter(this.refs.input.value);
      }
    }

    this.validate(this.refs.input.value);

    this.tryUpdateModel(this.refs.input.value);

    this.setState({
      tempValue: undefined
    });
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  onClickHandler(event) {
    const {onClick} = this.props;

    if (onClick) {
      onClick({event});
    }
  }

  onChangeHandler(event) {
    const {onChange, setOnBlur, setOnKeyEnter} = this.props;

    if (super.onChangeHandler) {
      super.onChangeHandler();
    }

    this.removeTooltip();

    if (!setOnBlur && !setOnKeyEnter) {
      this.handleInputChange();
    } else {
      this.setState({
        tempValue: this.refs.input.value
      });
    }

    if (onChange) {
      onChange(event, this.refs.input.value);
    }
  }

  onFocusHandler(event) {
    const {onFocus, selectAllWhenDefault = true, defaultValue} = this.props;

    if (selectAllWhenDefault && this.refs.input.value === defaultValue) {
      this.refs.input.setSelectionRange(0, this.refs.input.value.length);
    }

    if (onFocus) {
      onFocus({event});
    }
  }

  onBlurHandler(event) {
    const {onBlur, required, setOnBlur} = this.props;

    if (required) {
      this.validate(this.refs.input.value);
    }

    if (setOnBlur) {
      this.handleInputChange();
    }

    if (onBlur) {
      onBlur({event});
    }
  }

  onKeyPressHandler(event) {
    const {onEnterKey, setOnKeyEnter, onPressKey} = this.props;

    if (onEnterKey && event.key === 'Enter') {
      if (setOnKeyEnter) {
        this.handleInputChange();
      }

      onEnterKey(event);
    }

    if (onPressKey) {
      onPressKey(event);
    }
  }
}
