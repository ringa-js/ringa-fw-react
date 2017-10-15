import {Controller} from 'ringa';

import OverlayContainerModel from './OverlayContainerModel';

export default class OverlayContainerController extends Controller {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, bus, overlayContainer) {
    super(name, bus, overlayContainer);

    this.addModel(new OverlayContainerModel());

    this.addListener('showOverlay', ($customEvent, overlay, overlayContainerModel) => {
      if (!overlay.global) {
        overlay.container = overlayContainer.rootDomNode;
      }

      overlayContainerModel.addOverlay(overlay);

      $customEvent.stopPropagation();
    });

    this.addListener('removeOverlay', ($customEvent, overlay, overlayContainerModel) => {
      overlayContainerModel.removeOverlay(overlay);

      $customEvent.stopPropagation();
    });
  }
}
