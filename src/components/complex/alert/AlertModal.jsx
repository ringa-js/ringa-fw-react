import React, { Component } from 'react';
import PositionableComponent from '../../PositionableComponent';
import I18NModel from '../../../models/I18NModel';

import {watch, depend, dependency} from 'react-ringa';

import classnames from 'classnames';

export default class AlertModal extends PositionableComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    depend(this, dependency(I18NModel, 'language'));

    watch(this, props.alert);
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  set positionStyle(value) {
    super.positionStyle = this.props.alert.style = value;
  }

  get positionStyle() {
    return this._positionStyle;
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentDidMount() {
    let {alert} = this.props;

    super.componentDidMount();

    if (alert.buttons) {
      this.refs[alert.buttons[0].id].focus();
    }
  }

  render() {
    let {alert} = this.props;
    let {i18NModel} = this.state;

    let cn = this.calcClassnames('modal', 'alert', alert.classes);

    let message = typeof alert.messageOrRenderFunction === 'function' ? alert.messageOrRenderFunction(alert) : alert.messageOrRenderFunction;

    let buttons = alert.buttons.map(button => {
      let bcn = classnames('button', button.classes);

      return (<button className={bcn}
                     key={button.id}
                     ref={button.id}
                     onClick={this.button_onClickHandler.bind(this, button)}>
              {i18NModel.i18n(button.labelKey)}
             </button>);
    });

    return <div className={cn}
                style={this.positionStyle}
                ref="positionable"
                id={this.id}>
      <div className="alert-contents">
        <div className="message">
          {message}
        </div>
        <div className="buttons">
          {buttons}
        </div>
      </div>
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  getPositionableModel() {
    return this.props.alert;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  button_onClickHandler(button) {
    const {alert} = this.props;

    alert.dispatch('action', button);

    alert.remove();
  }
}
