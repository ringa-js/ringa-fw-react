import React from 'react';
import RingaComponent from '../RingaComponent';
import DragHandles from '../dragDrop/DragHandles';
import './DragListContainerItem.scss';

class DragListContainerItem extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  get watchMouseEvents() {
    return true;
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {children, showHandles = true} = this.props;
    const {mouseOver} = this.state;

    return <div className={this.calcClassnames('drag-list-container-item')}>
      {showHandles ? <DragHandles visible={mouseOver} /> : null}
      {children}
    </div>;
  }
}

export default DragListContainerItem;
