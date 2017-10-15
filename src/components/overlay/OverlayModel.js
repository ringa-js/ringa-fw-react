import {dispatch} from 'ringa';
import PositionableModel from '../PositionableModel';
import OverlayContainerController from './OverlayContainerController';

class OverlayModel extends PositionableModel {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('overlayComponent');
    this.addProperty('classes', {});
    this.addProperty('singleton');
    this.addProperty('singletonGroup');
    this.addProperty('renderer'); // A function used to render the children
    this.addProperty('closeTimeout', 0);
    this.addProperty('openTimeout', 0);
    this.addProperty('global', false);
    this.addProperty('removeHandler');

    if (typeof this.classes === 'string') {
      this.classes = this.classes.split(/\s/g);
      let c = {};
      this.classes.forEach(clazz => c[clazz] = true);
      this.classes = c;
    }

    if (!this.openTimeout) {
      this.classes.open = true;
    }
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  forceUpdate() {
    this.notify('forceUpdate');
  }

  mounted() {
    if (this.openTimeout) {
      this.classes.opening = true;

      this.notify('classes');

      setTimeout(() => {
        this.classes.opening = false;
        this.classes.open = true;

        this.notify('classes');
      }, this.openTimeout)
    }
  }

  remove(immediate = false) {
    let _remove = () => {
      dispatch(OverlayContainerController.REMOVE_OVERLAY, {
        overlay: this
      }, this.dispatchDomNode);

      if (this.removeHandler) {
        this.removeHandler(this);
      }
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
  }
}

OverlayModel.show = function ({renderer, target, position, positionAlternate, maxWidth, maxHeight, x, y, classes, singleton, singletonGroup, width, height, align, shift, alignAlternate, shiftAlternate, forceInViewport, global, overflowX, overflowY, mouseDownOutsideHandler, mouseLeaveHandler, onPositionUpdateHandler, closeTimeout, openTimeout, removeHandler, offset}, domNode) {
  let overlay = new OverlayModel(undefined, {
    renderer, target, position, positionAlternate, maxWidth, maxHeight, x, y, classes, singleton, singletonGroup, width, height, align, shift, alignAlternate, shiftAlternate, forceInViewport, global, overflowX, overflowY, mouseDownOutsideHandler, mouseLeaveHandler, onPositionUpdateHandler, closeTimeout, openTimeout, removeHandler, offset
  });

  overlay.dispatchDomNode = global ? document : domNode || document;

  dispatch(OverlayContainerController.SHOW_OVERLAY, {
    overlay
  }, overlay.dispatchDomNode);

  return overlay;
};

export default OverlayModel;