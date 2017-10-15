import React from 'react';
import './ModalHeader.scss';
import RingaComponent from '../RingaComponent';
import DragWrapper from '../complex/DragWrapper';

import classnames from 'classnames';

// TODO hook up to IconProviderModel
import CLOSE from '../../images/close.svg';

export default class ModalHeader extends RingaComponent {
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
    const {modalModel} = this.props;

    let cn = classnames('modal-header', modalModel.headerClasses);
    let tcn = classnames('title', {
      closeable: modalModel.showCloseButton
    });

    return <DragWrapper onDrag={this.dragWrapper_onDragHandler}
                        dragEnabled={modalModel.draggable}>
      <div className={cn}>
        {modalModel.title ? <div className={tcn}>{modalModel.title}</div> : undefined}
        {modalModel.showCloseButton ? <div className="modal-close-btn"
                                           onClick={this.closeButton_onClickHandler} ><img src={CLOSE}/></div> : undefined}
      </div>
    </DragWrapper>;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  dragWrapper_onDragHandler(deltaX, deltaY) {
    const {modalModel} = this.props;

    if (modalModel.draggable) {
      if (modalModel.position !== 'auto') {
        modalModel.position = 'auto';

        modalModel.x = modalModel.style.left;
        modalModel.y = modalModel.style.top;
      }

      modalModel.x += deltaX;
      modalModel.y += deltaY;
    }
  }

  closeButton_onClickHandler(event){
    const {modalModel} = this.props;
    
    modalModel.remove();

    event.stopPropagation();
  }
}
