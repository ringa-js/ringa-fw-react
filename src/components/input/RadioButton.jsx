import React from 'react';
import RingaComponent from '../RingaComponent';
import {watch} from 'react-ringa';

export default class RadioButton extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.id = props.id || Math.round(Math.random() * 100000).toString(16);

    this.watchModel();

    if (!props.value) {
      console.warn('RadioButton: please provide a value prop to all RadioButton objects!');
    }
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    let {label} = this.props;
    
    return <div id={this.id} className="radio-button" onClick={this.onClickHandler}>
      <input type="radio"
             checked={this.calcChecked()}
             onChange={() => {/* noop to get rid of warning */}} />
             {label ? <label className="radio-label"> {label}</label> : undefined}
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  watchModel() {
    if (this.props.model) {
      watch(this, this.props.model, [this.props.modelField]);
    }
  }

  calcChecked() {
    const {model, modelField, checked, toggleStateComponent, toggleStateField, value} = this.props;

    let showChecked = checked;

    if (toggleStateComponent && toggleStateField) {
      showChecked = toggleStateComponent.state[toggleStateField] === value;
    } else if (model && modelField) {
      showChecked = model[modelField] === value;
    }

    return showChecked;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  onClickHandler() {
    const {onChange, model, modelField, checked, toggleStateComponent, toggleStateField, value} = this.props;

    if (toggleStateComponent && toggleStateField) {
      let st = {};

      st[toggleStateField] = value;

      toggleStateComponent.setState(st);

      this.forceUpdate();
    }

    if (model && modelField) {
      model[modelField] = value;
    }

    if (onChange) {
      onChange({
        value
      });
    }
  }
}
