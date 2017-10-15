import React from 'react';
import ModalModel from '../../modal/ModalModel';
import AlertModal from './AlertModal';
import ModalContainerController from '../../modal/ModalContainerController';

import {dispatch} from 'ringa';

class AlertModel extends ModalModel {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('messageOrRenderFunction');
    this.addProperty('buttons');
  }

  //-----------------------------------
  // Statics
  //-----------------------------------
  static customWrapperRenderer(alertModel, manager) {
    return <AlertModal key={alertModel.id}
                       alert={alertModel}
                       manager={manager} />;
  }

  static show(messageOrRenderFunction, type, {renderer, title, target, position='centered', positionAlternate, maxWidth, maxHeight, x, y,
    classes, singleton, singletonGroup, width, height, align, shift, alignAlternate,
    shiftAlternate, forceInViewport, global, overflowX, overflowY, mouseDownOutsideHandler,
    mouseLeaveHandler, onPositionUpdateHandler, closeTimeout, openTimeout,
    blockMouseEvents=true,showCloseButton, draggable} = {}, domNode) {

    if (!domNode) {
      console.error('Alert.show: no domNode provided! Defaulting to the document. This might not work.');
    }

    if (typeof messageOrRenderFunction === 'string' && messageOrRenderFunction.length > 256) {
      messageOrRenderFunction = messageOrRenderFunction.substr(0, 256) + '...';
    }

    return new Promise(resolve => {
      let alertModel = type({
        messageOrRenderFunction,
        renderer, title, target, position, positionAlternate, maxWidth, maxHeight, x, y,
        classes, singleton, singletonGroup, width, height, align, shift, alignAlternate,
        shiftAlternate, forceInViewport, global, overflowX, overflowY, mouseDownOutsideHandler,
        mouseLeaveHandler, onPositionUpdateHandler, closeTimeout, openTimeout,
        blockMouseEvents,showCloseButton, draggable, customWrapperRenderer: AlertModel.customWrapperRenderer
      });

      alertModel.dispatchDomNode = global ? document : domNode || document;

      alertModel.addEventListener('action', ringaEvent => {
        resolve(ringaEvent.detail);
      });

      dispatch(ModalContainerController.SHOW_MODAL, {modalModel: alertModel}, alertModel.dispatchDomNode);
    });
  };
}

AlertModel.YES_NO = (values) => {
  values = Object.assign({
    buttons: [{
      labelKey: 'alert.yes',
      id: 'yes',
      classes: 'green'
    }, {
      labelKey: 'alert.no',
      id: 'no',
      classes: 'red'
    }]
  }, values);

  return new AlertModel(values);
};

AlertModel.OK = (values) => {
  values = Object.assign({
    buttons: [{
      labelKey: 'alert.ok',
      id: 'ok',
      classes: 'green'
    }]
  }, values);

  return new AlertModel(values);
};

AlertModel.OK_CANCEL = (values) => {
  values = Object.assign({
    buttons: [{
      labelKey: 'alert.ok',
      id: 'ok',
      classes: 'green'
    }, {
      labelKey: 'alert.cancel',
      id: 'cancel'
    }]
  }, values);

  return new AlertModel(values);
};

export default AlertModel;