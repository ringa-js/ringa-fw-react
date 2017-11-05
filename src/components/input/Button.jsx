import React from 'react';
import RingaComponent from '../RingaComponent';

export default class Button extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {label, id, selected} = this.props;

    return <button className={this.calcClassnames('button', {selected})} onClick={this.onClickHandler} id={id}>{label}</button> ;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  onClickHandler(event) {
    const {onClick, toggleStateComponent, toggleStateField} = this.props;

    if (toggleStateComponent && toggleStateField) {
      let st = {};
      st[toggleStateField] = (toggleStateComponent.state && toggleStateComponent.state[toggleStateField] !== undefined) ? !toggleStateComponent.state[toggleStateField] : true;

      toggleStateComponent.setState(st);
    }

    if (onClick) {
      onClick(event);
    }
  }
}
