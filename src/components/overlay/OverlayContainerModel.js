import {Model} from 'ringa';

export default class OverlayContainerModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name) {
    super(name);

    this.addProperty('overlays', []);
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  clearSingletons(group = undefined, notify = false) {
    this.overlays.concat().forEach((overlay, ix) => {
      if ((group === undefined && overlay.singleton) || overlay.singletonGroup === group) {
        overlay.remove();
      }
    });

    if (notify) {
      this.notify('overlays');
    }
  }

  addOverlay(overlay) {
    if (overlay.singleton) {
      this.clearSingletons(overlay.singletonGroup);
    }

    this.overlays.push(overlay);

    this.notify('overlays');
  }

  removeOverlay(overlay) {
    const ix = this.overlays.indexOf(overlay);

    if (ix !== -1) {
      this.removeOverlayAt(ix);
    }

    this.notify('overlays');
  }

  removeOverlayAt(ix) {
    this.overlays.splice(ix, 1);

    this.notify('overlays');
  }
}
