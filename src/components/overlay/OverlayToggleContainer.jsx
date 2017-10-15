import React from 'react';
import RingaComponent from '../RingaComponent';
import OverlayModel from './OverlayModel';

export default class OverlayContainer extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentWillUpdate(nextProps, nextState) {
    const {show, targetId, position, maxWidth, maxHeight, positionAlternate, align, mouseDownOutsideHandler, shift, alignAlternate, shiftAlternate, x, y, offset, width, height, forceInViewport = false, global} = nextProps;

    if (show && !this.overlay) {
      let target = targetId ? document.getElementById(targetId) : undefined;

      this.overlay = OverlayModel.show({
        target,
        position,
        positionAlternate,
        align,
        shift,
        alignAlternate,
        shiftAlternate,
        x, y, width, height,
        maxWidth, maxHeight,
        offset,
        forceInViewport,
        global,
        mouseDownOutsideHandler,
        renderer: this.renderer.bind(this)
      }, this.rootDomNode);
    } else if (this.overlay) {
      this.overlay.forceUpdate();
    }

    if (!show && this.overlay) {
      this.overlay.remove();
      this.overlay = undefined;
    }
  }

  render() {
    return <div style={{width: 0}} />;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  renderer() {
    return this.props.children;
  }
}
