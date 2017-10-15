import React from 'react';
import RingaComponent from '../RingaComponent';
import ModalModel from './ModalModel';

export default class ModalToggleContainer extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentDidMount() {
    super.componentDidMount();

    setTimeout(() => {
      this.triggerModal(this.props);
    }, 0);
  }

  componentWillUpdate(nextProps, nextState) {
    this.triggerModal(nextProps);
  }

  render() {
    return <div style={{display: 'none'}}>ModalToggleContainer</div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  renderer() {
    return this.props.children;
  }

  triggerModal(props) {
    const {show, title, targetId, position, positionAlternate, align,
           mouseDownOutsideHandler, shift, alignAlternate, shiftAlternate,
           offset, width, height, forceInViewport = false, global, singleton,
           blockMouseEvents , closable, onClose, draggable = true, showHeader=true,
           classes, target, maxWidth, maxHeight, singletonGroup, overflowX,
           overflowY, mouseLeaveHandler, onPositionUpdateHandler, closeTimeout, openTimeout,
           showCloseButton} = props;

    let {x, y} = props;

    if (show && !this.modal) {
      let target = targetId ? document.getElementById(targetId) : undefined;

      if (target === undefined && (x === undefined || y === undefined)) {
        x = 0;
        y = 0;
      }

      this.modal = ModalModel.show({
        target,
        title,
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
        singleton,
        mouseDownOutsideHandler,
        blockMouseEvents,
        closable,
        renderer: this.renderer.bind(this),
        draggable,
        showHeader,
        classes,
        $ringaAlternateParentComponent: this
      }, this.rootDomNode);

      this.modal.addEventListener('remove', this.modal_removeHandler);
    }

    if (!show && this.modal) {
      this.modal.remove();
      this.modal = undefined;
    }
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  modal_removeHandler(event) {
    const {onClose} = this.props;

    if (onClose) {
      onClose(event);
    }
  }
}
