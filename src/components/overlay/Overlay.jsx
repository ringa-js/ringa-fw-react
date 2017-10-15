import React from 'react';
import './Overlay.scss';
import PositionableComponent from '../PositionableComponent';
import {watch} from 'react-ringa';
import classnames from 'classnames';

export default class Overlay extends PositionableComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    watch(this, props.overlay);

    props.overlay.overlayComponent = this;

    props.overlay.addEventListener('refresh', () => {
      this.forceFullPositionRecalculation = true;
      this.updatePosition();
      this.forceUpdate();
    });
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  set positionStyle(value) {
    super.positionStyle = this.props.overlay.style = value;
  }

  get positionStyle() {
    return this._positionStyle;
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentDidMount() {
    super.componentDidMount();

    if (this.props.overlay) {
      this.props.overlay.mounted();
    }
  }

  getPositionableModel() {
    return this.props.overlay;
  }

  render() {
    let overlayModel = this.props.overlay;

    let cn = classnames('overlay', overlayModel.classes);

    if (this.positionOptions.alternate) {
      cn += ` position-${this.positionOptions.alternate}`;
    }

    let children;

    if (!overlayModel.renderer) {
      console.error('Overlay::render(): overlayModel.renderer is undefined');
    } else {
      children = overlayModel.renderer(this);
    }

    return <div className={cn}
                style={this.positionStyle}
                ref="positionable"
                id={this.id}
                onMouseLeave={this.onMouseLeaveHandler}>
      {children}
    </div>;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  onMouseLeaveHandler(event) {
    const {overlay} = this.props;

    if (overlay && overlay.mouseLeaveHandler) {
      overlay.mouseLeaveHandler(event);
    }
  }
}
