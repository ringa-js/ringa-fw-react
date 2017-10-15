import React from 'react';
import RingaComponent from '../RingaComponent';

import './DragWrapper.scss';

class DragWrapper extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.state = Object.assign({
      dragging: false
    }, this.state);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentWillUnmount() {
    super.componentWillUnmount();

    this.endDrag();
  }

  render() {
    const {children, dragEnabled = true} = this.props;
    const {dragging} = this.state;

    return <div className={this.calcClassnames("drag-wrapper", {dragging, dragEnabled})}
                onMouseDown={this.onMouseDownHandler}>
      {children}
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  endDrag() {
    window.removeEventListener('mousemove', this.window_mouseMoveHandler, true);
    window.removeEventListener('mouseleave', this.window_mouseLeaveHandler, true);
    window.removeEventListener('click', this.window_clickHandler, true);

    this.setState({
      dragging: false
    });
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  onMouseDownHandler(event) {
    const {dragEnabled = true} = this.props;

    if (dragEnabled) {
      this.lastX = event.clientX;
      this.lastY = event.clientY;

      window.addEventListener('mousemove', this.window_mouseMoveHandler, true);
    }
  }

  document_mouseOutHandler(e) {
    e = e ? e : window.event;
    let from = e.relatedTarget || e.toElement;
    if (!from || from.nodeName == "HTML") {
      this.endDrag();
    }
  }

  window_mouseMoveHandler(event) {
    const {modalModel} = this.props;

    let deltaX = event.clientX - this.lastX;
    let deltaY = event.clientY - this.lastY;

    this.lastX = event.clientX;
    this.lastY = event.clientY;

    if (!this.state.dragging) {
      document.addEventListener('mouseout', this.document_mouseOutHandler, true);
      window.addEventListener('click', this.window_clickHandler, true);

      this.setState({
        dragging: true
      });

      const {onStartDrag} = this.props;

      if (onStartDrag) {
        onStartDrag();
      }
    }

    const {onDrag} = this.props;

    if (onDrag) {
      onDrag(deltaX, deltaY);
    }

    event.cancelBubble = true;
    event.preventDefault();
    event.stopPropagation();

    return false;
  }

  window_clickHandler(event) {
    this.endDrag();

    event.stopPropagation();
  }
}

export default DragWrapper;
