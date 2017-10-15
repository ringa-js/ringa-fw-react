import {Model} from 'ringa';

export default class TooltipContainerModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name) {
    super(name);

    this.addProperty('tooltips', []);
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  clearSingletons(notify = false) {
    const _tooltips = this.tooltips.concat();

    _tooltips.forEach((tooltip, ix) => {
      if (tooltip.singleton) {
        this.removeTooltipAt(ix);
      }
    });

    if (notify) {
      this.notify('tooltips');
    }
  }

  addTooltip(tooltip) {
    if (tooltip.singleton) {
      this.clearSingletons();
    }

    this.tooltips.push(tooltip);

    this.notify('tooltips');
  }

  removeTooltip(tooltip) {
    const ix = this.tooltips.indexOf(tooltip);

    if (ix !== -1) {
      this.removeTooltipAt(ix);
    }
  }

  removeTooltipAt(ix) {
    this.tooltips.splice(ix, 1);

    this.notify('tooltips');
  }
}
