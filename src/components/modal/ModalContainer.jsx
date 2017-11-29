import React from 'react';
import ModalContainerController from './ModalContainerController';
import RingaComponent from '../RingaComponent';
import ModalContainerModel from './ModalContainerModel';
import Modal from './Modal';

import {attach, depend, dependency} from 'react-ringa';

export default class ModalContainer extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    let controller = new ModalContainerController(undefined, undefined, this);

    if (props.controllerId) {
      controller.id = props.controllerId;
    }

    attach(this, controller, {
      bus: props.global ? document : undefined
    });

    depend(this, dependency(ModalContainerModel, ['modals']));
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {children, global, zIndex, independent = false} = this.props;

    if (independent) {
      return this.renderIndependent(); // Useful for displaying positionable modals in an application that is not ringa
                                       // based
    }

    let {modals, blockMouseEvents} = this.state.modalContainerModel;

    modals = modals.map(this.renderModal);

    let cn = this.calcClassnames('modal-container-wrapper');

    let style = {
      zIndex: global ? 10000 : zIndex
    };

    let cnContents = this.calcClassnames('modal-container-contents', 'fill', {
      'block-mouse-events': blockMouseEvents
    });

    return <div className={cn}>
      <div className={cnContents}>
        {children}
      </div>
      <div className="modal-container" style={style}>
        {modals}
      </div>
    </div> ;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  renderIndependent() {
    const {zIndex} = this.props;

    let {modals} = this.state.modalContainerModel;

    modals = modals.map(this.renderModal);

    let cn = this.calcClassnames('modal-container-independent', {
      'has-modals': modals.length > 0
    });

    let style = {
      zIndex: global ? 10000 : zIndex
    };

    return <div className={cn} style={style}>
      {modals}
    </div> ;
  }

  renderModal(modal) {
    if (modal.customWrapperRenderer) {
      return modal.customWrapperRenderer(modal, this);
    }

    return <Modal key={modal.id}
                  modal={modal}
                  manager={this}/>;
  }
}
