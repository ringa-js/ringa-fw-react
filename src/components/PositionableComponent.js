import React, { Component } from 'react';
import RingaComponent from './RingaComponent';
import {calcRelativeViewportPosition, getBounds, adjustBy, makeGlobalStyleRelativeTo, hasAncestorWithId, getSize} from '../utils/DisplayUtils';
import deepEqual from 'deep-equal';

export default class PositionableComponent extends RingaComponent {
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
    this._positionStyle = value;
  }

  get positionStyle() {
    return this._positionStyle;
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentDidMount() {
    this.afterUpdate();

    this.getPositionableModel().component = this;

    if (this.getPositionableModel().mouseDownOutsideHandler) {
      window.addEventListener('click', this.window_clickHandler);
    }

    if (this.getPositionableModel().position === 'centered') {
      window.addEventListener('resize', this.window_resizeHandler);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    if (this.poll) {
      clearInterval(this.poll);
    }

    this.removeWindowListener();
  }

  componentWillReceiveProps(nextProps) {

  }

  componentDidUpdate() {
    this.afterUpdate();
  }

  componentWillMount() {
    this.updatePosition();
  }

  componentWillUpdate() {
    this.updatePosition();
  }

  render() {
    return null;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  removeWindowListener() {
    if (this.getPositionableModel().mouseDownOutsideHandler) {
      window.removeEventListener('click', this.window_clickHandler);
    }
  }

  updatePosition() {
    let model = this.getPositionableModel();
    let calc = this.calcPositionStyleAndOptions(this.getPositionableModel());

    if (!this.positionStyle || !deepEqual(this.positionStyle, calc.style) || !deepEqual(this.positionOptions, calc.options)) {
      this.positionStyle = model.positionStyle = calc.style;
      this.positionOptions = model.positionOptions = calc.options;

      this.getPositionableModel().dispatch('positionOptionsChange');

      if (model.onPositionUpdateHandler) {
        model.onPositionUpdateHandler(model);
      }

      return true;
    }

    return false;
  }

  tryPollMovement() {
    let model = this.getPositionableModel();
    if (!this.poll && model.target && model.trackMovement) {
      this.lastTargetBounds = getBounds(model.target);

      this.poll = setInterval(this.intervalHandler, model.pollInterval);
    }
  }

  getPositionableModel() {
    throw new Error(`Error in ${this.constructor.name}: to extend PositionableComponent you must override getPositionableModel and return a Model object that extends PositionableModel.`);
  }

  afterUpdate() {
    this.tryPollMovement();

    if (this.recalculate) {
      this.recalculate = false;

      this.forceUpdate();
    }
  }

  calcPositionStyleAndOptions(positionableModel) {
    let style = {
      maxWidth: positionableModel.maxWidth,
      maxHeight: positionableModel.maxHeight,
      overflowX: positionableModel.overflowX,
      overflowY: positionableModel.overflowY,
      width: positionableModel.width,
      height: positionableModel.height,
      zIndex: positionableModel.zIndex
    };

    let options = {};

    if (!this.refs.positionable || this.forceFullPositionRecalculation) {
      this.recalculate = true;
      this.forceFullPositionRecalculation = false;

      return {
        style:Object.assign({}, {
          left: -10000,
          top: -10000
        }, style),
        options
      };
    }

    let position = positionableModel.position;

    if (position === 'auto') {
      if (positionableModel.target) {
        position = 'bottom';
      } else if (typeof positionableModel.x === 'number' && typeof positionableModel.y === 'number') {
        position = 'xy';
      } else {
        throw Error('PositionableComponent::calcPositionStyleAndOptions(): you must provide either a target for a PositionableModel or an x, y position!');
      }
    }

    if (position === 'xy') {
      style.left = positionableModel.x + positionableModel.offset.x;
      style.top = positionableModel.y + positionableModel.offset.y;

      adjustBy(style, positionableModel.shift, getBounds(this.refs.positionable));
    } else if (position === 'centered') {
      let size = getSize(this.refs.positionable);

      let x = (window.innerWidth / 2) - (size.width / 2);
      let y = (window.innerHeight / 2) - (size.height / 2);

      style = Object.assign({
        top: y,
        left: x
      }, style);
    } else {
      // If the target, for whatever reason, has been removed from the screen, we just don't change our position at all.
      if (!document.body.contains(positionableModel.target)) {
        return {
          style: this.lastStyle,
          options: this.lastOptions
        };
      }

      let calc = calcRelativeViewportPosition(this.refs.positionable, positionableModel.target, {
        position,
        positionAlternate: positionableModel.positionAlternate,
        align: positionableModel.align,
        shift: positionableModel.shift,
        alignAlternate: positionableModel.alignAlternate,
        shiftAlternate: positionableModel.shiftAlternate,
        offset: positionableModel.offset,
        forceInViewport: positionableModel.forceInViewport
      });

      let calcStyle = calc.style;
      options = calc.options;

      if (positionableModel.container) {
        makeGlobalStyleRelativeTo(calcStyle, positionableModel.container);
      }

      style = Object.assign({}, calcStyle, style);
    }

    this.lastStyle = style;
    this.lastOptions = options;

    positionableModel.style = style;

    return {
      style,
      options
    };
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  intervalHandler() {
    let model = this.getPositionableModel();
    let l = this.lastTargetBounds;
    let n = getBounds(model.target);

    if (l.left !== n.left ||
        l.top !== n.top ||
        l.width !== n.width ||
        l.height !== n.height) {
      if (this.updatePosition()) {
        this.forceUpdate();
      }
    }
  }

  /**
   * This should only be called if the PositionableModel has the mouseDownOutsideHandler set to a function.
   */
  window_clickHandler(event) {
    if (!hasAncestorWithId(event.target, this.id)) {
      this.getPositionableModel().mouseDownOutsideHandler(event);
    }
  }

  window_resizeHandler(event) {
    if (this.updatePosition()) {
      this.forceUpdate();
    }
  }
}
