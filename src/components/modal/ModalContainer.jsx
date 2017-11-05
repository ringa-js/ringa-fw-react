import React from 'react';
import ModalContainerController from './ModalContainerController';
import RingaComponent from '../RingaComponent';
import ModalContainerModel from './ModalContainerModel';
import Modal from './Modal';

import classnames from 'classnames';

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
    const {children, global, zIndex} = this.props;

    let {modals, blockMouseEvents} = this.state.modalContainerModel;

    modals = modals.map(this.renderModal);

    let cn = this.calcClassnames('modal-container-wrapper');

    let style = {
      zIndex: global ? 10000 : zIndex
    };

    let cnContents = classnames('modal-container-contents', 'fill', {
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
  renderModal(modal) {
    if (modal.customWrapperRenderer) {
      return modal.customWrapperRenderer(modal, this);
    }

    return <Modal key={modal.id}
                  modal={modal}
                  manager={this}/>;
  }
}
