import {Model, dispatch} from 'ringa';
import PositionableModel from '../PositionableModel';
import TooltipController from './TooltipController';
import {isOver} from '../../utils/DisplayUtils';

class TooltipModel extends PositionableModel {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('message', '[No message provided to the model]');
    this.addProperty('timeout');
    this.addProperty('classes');
    this.addProperty('mouseOverCloses', true);
    this.addProperty('singleton', true);
    this.addProperty('pre', false);

    if (values) {
      if (!values.message) {
        console.error('TooltipModel(): you must provide a message!');
      }
    }
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  remove(unlessOver = false, mouseEvent = undefined) {
    if (unlessOver && mouseEvent) {
      setTimeout(() => {
        if (this.domNode && !isOver(mouseEvent, this.domNode)) {
          dispatch(TooltipController.REMOVE_TOOLTIP, {
            tooltip: this
          }, document);
        }
      }, 400);

      mouseEvent.persist();

      return false;
    }

    dispatch(TooltipController.REMOVE_TOOLTIP, {
      tooltip: this
    }, document);

    return true;
  }
}

TooltipModel.show = function ({message, target, position, timeout, singleton, offset, x, y, maxWidth, pre, classes, forceInViewport}) {
  let tooltip = new TooltipModel(undefined, {
    message, target, position, timeout, singleton, offset, x, y, maxWidth, pre, classes, forceInViewport
  });

  dispatch(TooltipController.SHOW_TOOLTIP, {
    tooltip
  }, document);

  return tooltip;
};

export default TooltipModel;