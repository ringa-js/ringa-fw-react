import {Controller} from 'ringa';
import {domNodeToNearestReactComponent, getAllReactComponentAncestors} from 'react-ringa';
import {isOver} from '../../utils/DisplayUtils';

import DragDropModel from './DragDropModel';

/**
 * Walks the React Components up through the parent heirarchy until we find an item that has dragData.
 *
 * @param component A React Component instance.
 */
function findNearestDragSource(component) {
  component = component._reactInternalInstance;

  while (component) {
    let item = component._instance || component._currentElement._owner._instance;

    if (item.props && item.props.dragData) {
      return item;
    }

    component = component._hostParent;
  }

  return undefined;
};

export default class DragDropController extends Controller {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, bus) {
    super(name, bus || document, {
      debug: true
    });
    
    this.addModel(this.dragDropModel = new DragDropModel());

    this.addListener('registerDragInitiator', (dragDropModel, dragInitiator) => {
      if (dragDropModel.hasDragInitiator(dragInitiator)) {
        console.error('DragDropController:: registering the same drag initiator twice!');
        return;
      }

      dragDropModel.addDragInitator(dragInitiator);

      this.watchInitiator(dragInitiator);
    });

    this.addListener('unregisterDragInitiator', (dragDropModel, dragInitiator) => {
      if (!dragDropModel.hasDragInitiator(dragInitiator)) {
        console.error('DragDropController:: attempting to remove a dragInitiator that was not registered');
        return;
      }

      dragDropModel.removeDragInitator(dragInitiator);

      this.unwatchInitiator(dragInitiator);
    });

    this.addListener('registerDropTarget', (dragDropModel, dropTargetComponent) => {
      if (dragDropModel.hasDropTarget(dropTargetComponent)) {
        console.error('DragDropController:: registering the same drag target twice!');
        return;
      }

      dragDropModel.addDropTarget(dropTargetComponent);
    });

    this.addListener('unregisterDropTarget', (dragDropModel, dropTargetComponent) => {
      if (!dragDropModel.hasDropTarget(dropTargetComponent)) {
        console.error('DragDropController:: attempting to remove a drop target that was not registered');
        return;
      }

      dragDropModel.removeDropTarget(dropTargetComponent);
    });

    this.initiator_mouseDownHandler = this.initiator_mouseDownHandler.bind(this);
    this.window_mouseMoveHandler = this.window_mouseMoveHandler.bind(this);
    this.window_mouseUpHandler = this.window_mouseUpHandler.bind(this);
    this.document_mouseOutHandler = this.document_mouseOutHandler.bind(this);
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  watchInitiator(initiator) {
    initiator.rootDomNode.addEventListener('mousedown', this.initiator_mouseDownHandler);
  }

  unwatchInitiator(initiator) {
    initiator.rootDomNode.removeEventListener('mousedown', this.initiator_mouseDownHandler);
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  initiator_mouseDownHandler(event) {
    //First we go through the parents in the DOM tree to find the drag initiator component
    let initiator = undefined;
    let t = event.target;

    while (!initiator) {
      initiator = t.dragInitiator;
      t = t.parentNode;
    }

    this.dragDropModel.dragInitiator = initiator;

    let dragSource = this.dragDropModel.dragSource = findNearestDragSource(initiator);

    if (!dragSource) {
      throw new Error('Could not find a drag source in the parent ancestors for', initiator);
    }

    this.dragDropModel.dragSource = dragSource;

    window.addEventListener('mousemove', this.window_mouseMoveHandler, true);
    window.addEventListener('mouseup', this.window_mouseUpHandler, true);
    document.addEventListener('mouseout', this.document_mouseOutHandler, true);

    event.stopPropagation();
    event.preventDefault();
  }

  window_mouseMoveHandler(event) {
    if (!this.dragDropModel.isDragging && this.dragDropModel.dragSource.dragStart) {
      this.dragDropModel.dropTargets.forEach(target => {
        if (target.dropTargetComponent.dragActivated) {
          target.dropTargetComponent.dragActivated(this.dragDropModel, event);
        }
      });

      this.dragDropModel.dragSource.dragStart(this.dragDropModel, event);

      this.dragDropModel.isDragging = true;
    } else if (this.dragDropModel.dragSource.dragMove) {
      this.dragDropModel.dragSource.dragMove(event);
    }

    let reactComponent = domNodeToNearestReactComponent(event.target);

    if (reactComponent) {
      let oldDropTarget = this.dragDropModel.dropTarget;

      this.dragDropModel.dropTarget = undefined;

      let potentialNewDropTarget, newDropTarget;
      let ancestors = getAllReactComponentAncestors(reactComponent);

      for (let i = 0; i < ancestors.length; i++) {
        let targetComponent = ancestors[i];

        potentialNewDropTarget = this.dragDropModel.getDropTargetByComponent(targetComponent);

        // Even though the ancestor is technically in the parent stack of the target mouse item, we should
        // still check if the mouse is inside of it.
        if (potentialNewDropTarget && isOver(event, targetComponent.rootDomNode)) {
          if (!targetComponent.dropAcceptHandler || targetComponent.dropAcceptHandler(this.dragDropModel.dragSource.dragData, event)) {
            this.dragDropModel.dropTarget = newDropTarget = potentialNewDropTarget;

            if (oldDropTarget !== newDropTarget) {
              targetComponent.dragEnter(this.dragDropModel.dragSource.dragData, event)
            }

            if (targetComponent.dropMove) {
              targetComponent.dropMove(this.dragDropModel.dragSource.dragData, event);
            }

            break;
          }
        }
      } // break;

      if (oldDropTarget && oldDropTarget !== newDropTarget) {
        if (oldDropTarget.dropTargetComponent.dropMove) {
          oldDropTarget.dropTargetComponent.dropMove(this.dragDropModel.dragSource.dragData, event);
        }

        if (oldDropTarget.dropTargetComponent.dragLeave) {
          oldDropTarget.dropTargetComponent.dragLeave();
        }
      }
    }

    event.stopPropagation();
  }

  window_mouseUpHandler(event) {
    window.removeEventListener('mousemove', this.window_mouseMoveHandler, true);
    window.removeEventListener('mouseup', this.window_mouseUpHandler, true);
    document.removeEventListener('mouseout', this.document_mouseOutHandler, true);

    let {dragData} = this.dragDropModel.dragSource;

    if (this.dragDropModel.dragSource.dragEnd) {
      this.dragDropModel.dragSource.dragEnd(event, dragData,
        this.dragDropModel.dropTarget && this.dragDropModel.dropTarget.dropTargetComponent ? this.dragDropModel.dropTarget.dropTargetComponent : undefined);
    }

    if (this.dragDropModel.dropTarget && this.dragDropModel.dropTarget.dropTargetComponent.dragDrop) {
      this.dragDropModel.dropTarget.dropTargetComponent.dragDrop(this.dragDropModel.dragSource.dragData, event);
    }

    this.dragDropModel.dropTargets.forEach(target => {
      if (!target.dropTargetComponent.unmounted && target.dropTargetComponent.dragDeactivated) {
        target.dropTargetComponent.dragDeactivated(this.dragDropModel, event);
      }
    });

    this.dragDropModel.isDragging = false;

    event.stopPropagation();
  }

  document_mouseOutHandler(event) {
    if (event.toElement == null && event.relatedTarget == null) {
      this.window_mouseUpHandler(event);
    }
  }
}
