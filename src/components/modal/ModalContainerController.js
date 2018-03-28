import {Controller} from 'ringa';

import ModalContainerModel from './ModalContainerModel';

export default class ModalContainerController extends Controller {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, bus, modalContainer) {
    super(name, bus, modalContainer);

    this.addModel(new ModalContainerModel());

    // ModelContainerController.SHOW_MODAL
    this.addListener('showModal', ($customEvent, modalModel, modalContainerModel) => {
      if (!modalModel.global) {
        modalModel.container = modalContainer.rootDomNode;
      }

      modalContainerModel.addModal(modalModel);

      $customEvent.stopPropagation();
    });

    // ModelContainerController.REMOVE_MODAL
    this.addListener('removeModal', ($customEvent, modalModel, modalContainerModel) => {
      modalContainerModel.removeModal(modalModel);

      $customEvent.stopPropagation();
    });

    this.addListener('removeAllModals', ($customEvent, modalContainerModel) => {
      modalContainerModel.removeAllModals();

      $customEvent.stopPropagation();
    });
  }
}
