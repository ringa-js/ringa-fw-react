import React from 'react';
import RingaComponent from '../RingaComponent';
import {watch} from 'react-ringa';

export default class Checkbox extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.id = props.id || Math.round(Math.random() * 100000).toString(16);

    this.watchModel();
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    let {label} = this.props;
    
    return <div id={this.id} className="squaredFour checkbox-container" onClick={this.onClickHandler}>
      <input type="checkbox"
             checked={this.calcChecked()}
             onChange={() => {/* noop to get rid of warning */}} />
      <div className="checkbox-box" htmlFor={this.id} />
      {label ? <label className="checkbox-label"> {label}</label> : undefined}
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
    const {model, modelField, checked, toggleStateComponent, toggleStateField} = this.props;

    let showChecked = checked;

    if (toggleStateComponent && toggleStateField) {
      showChecked = toggleStateComponent.state[toggleStateField];
    } else if (model && modelField) {
      showChecked = model[modelField];
    }

    return showChecked;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  onClickHandler() {
    const {onChange, model, modelField, checked, toggleStateComponent, toggleStateField} = this.props;

    if (toggleStateComponent && toggleStateField) {
      let st = {};
      st[toggleStateField] = (toggleStateComponent.state && toggleStateComponent.state[toggleStateField]) ? !toggleStateComponent.state[toggleStateField] : true;

      toggleStateComponent.setState(st);

      this.forceUpdate();
    }

    if (model && modelField) {
      model[modelField] = !this.calcChecked();
    }

    if (onChange) {
      onChange({
        checked: !checked
      });
    }
  }
}
