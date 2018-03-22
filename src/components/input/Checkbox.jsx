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

    this.state = {
      checked: undefined,
      stateDriven: false
    };

    this.watchModel();
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    let {label, disabled} = this.props;

    return <div id={this.id} className="squaredFour checkbox-container" onClick={this.onClickHandler}>
      <input type="checkbox"
             checked={this.calcChecked()}
             disabled={disabled}
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
    const {stateDriven} = this.state;
    const stateChecked = this.state.checked;

    if (stateChecked !== undefined) {
      return stateChecked;
    }

    let showChecked = checked;

    if (toggleStateComponent && toggleStateField) {
      showChecked = toggleStateComponent.state[toggleStateField];
    } else if (model && modelField) {
      showChecked = model[modelField];
    } else if (stateDriven && showChecked === undefined) {
      showChecked = false;
    }

    return showChecked;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  onClickHandler() {
    let {onChange, model, modelField, toggleStateComponent, toggleStateField, disabled} = this.props;

    if (disabled) {
        return;
    }

    let checked = this.calcChecked();

    if (toggleStateComponent && toggleStateField) {
      let st = {};
      st[toggleStateField] = (toggleStateComponent.state && toggleStateComponent.state[toggleStateField]) ? !toggleStateComponent.state[toggleStateField] : true;

      toggleStateComponent.setState(st);

      this.forceUpdate();
    } else if (model && modelField) {
      model[modelField] = !checked;
    } else if (this.props.checked === undefined) {
      this.setState({
        checked: !checked,
        stateDriven: true
      });
    }

    if (onChange) {
      onChange({
        checked: !checked
      });
    }
  }
}
