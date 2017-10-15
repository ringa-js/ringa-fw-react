import {Controller} from 'ringa';

import TooltipContainerModel from './TooltipContainerModel';

export default class TooltipController extends Controller {
  /**
   * Constructs the AppController. Constructed and attached in App.js.
   */
  constructor() {
    super('TooltipController', document);

    this.addModel(new TooltipContainerModel());

    this.addListener('showTooltip', (tooltip, tooltipContainerModel) => {
      tooltipContainerModel.addTooltip(tooltip);
    });

    this.addListener('removeTooltip', (tooltip, tooltipContainerModel) => {
      tooltipContainerModel.removeTooltip(tooltip);
    });
  }
}
