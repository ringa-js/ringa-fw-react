import {dispatch, RingaEvent} from 'ringa';
import PositionableModel from '../PositionableModel';
import ModalContainerController from '../modal/ModalContainerController'

class ModalModel extends PositionableModel {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('renderer'); // A function used to render the children *OR* a React Component class
    this.addProperty('rendererProps'); // If the above is a class, this is the props to pass in.
    this.addProperty('title');
    this.addProperty('showCloseButton', true);
    this.addProperty('singleton', false);
    this.addProperty('blockMouseEvents', false);
    this.addProperty('draggable', false);
    this.addProperty('customWrapperRenderer');
    this.addProperty('showHeader', true);
    this.addProperty('classes');
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  remove(immediate = false) {
    if (this.removed) {
      return;
    }

    let _remove = () => {
      dispatch(ModalContainerController.REMOVE_MODAL, {
        modalModel: this
      }, this.dispatchDomNode);

      this.dispatch('remove');
    };

    if (this.closeTimeout && !immediate) {
      this.classes.closing = true;

      this.notify('classes');

      setTimeout(_remove.bind(this), this.closeTimeout);
    } else {
      _remove();
    }

    if (this.overlayComponent) {
      this.overlayComponent.removeWindowListener();
    }

    this.removed = true;
  }

  //-----------------------------------
  // Statics
  //-----------------------------------
  static show({renderer, title, target, position, positionAlternate, maxWidth, maxHeight, x, y,
      classes, singleton, singletonGroup, width, height, align, shift, alignAlternate,
      shiftAlternate, forceInViewport, global, overflowX, overflowY, mouseDownOutsideHandler,
      mouseLeaveHandler, onPositionUpdateHandler, closeTimeout, openTimeout,
      blockMouseEvents,showCloseButton, draggable, showHeader, $ringaAlternateParentComponent}, domNode) {

    let modalModel = new ModalModel(undefined, {
      renderer, title, target, position, positionAlternate,
      maxWidth: width === undefined ? maxWidth : 10000,
      maxHeight: height === undefined ? maxHeight: 10000, x, y,
      classes, singleton, singletonGroup, width, height, align, shift, alignAlternate,
      shiftAlternate, forceInViewport, global, overflowX, overflowY, mouseDownOutsideHandler,
      mouseLeaveHandler, onPositionUpdateHandler, closeTimeout, openTimeout,
      blockMouseEvents,showCloseButton, draggable, showHeader, $ringaAlternateParentComponent
    });

    modalModel.dispatchDomNode = global ? document : domNode || document;

    dispatch(ModalContainerController.SHOW_MODAL, {modalModel}, modalModel.dispatchDomNode);

    return modalModel;
  };
}

export default ModalModel;