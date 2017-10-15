import React, { Component } from 'react';
import './Tooltip.scss';
import PositionableComponent from '../PositionableComponent';

import classnames from 'classnames';

export default class Tooltip extends PositionableComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  set positionStyle(value) {
    super.positionStyle = this.props.tooltip.style = value;
  }

  get positionStyle() {
    return this._positionStyle;
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    let {tooltip} = this.props;

    let cn = classnames('tooltip', 'fade-in', tooltip.classes);

    return <div className={cn} style={this.positionStyle} onMouseLeave={this.onMouseLeaveHandler} ref="positionable">
      {tooltip.message && tooltip.pre ? <pre className="message">{tooltip.message}</pre> : null}
      {tooltip.message && !tooltip.pre ? <div className="message">{tooltip.message}</div> : null}
      {tooltip.children ? <div className="children">{tooltip.children}</div> : null}
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  getPositionableModel() {
    return this.props.tooltip;
  }

  afterUpdate() {
    if (this.props.tooltip) {
      this.props.tooltip.domNode = this.refs.tooltip;
    }

    super.afterUpdate();
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  onMouseLeaveHandler(event) {
    this.props.tooltip.remove(true);
  }
}
