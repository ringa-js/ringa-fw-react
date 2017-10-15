import {Model} from 'ringa';

export class DropTargetModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);
  }
}

export class DragSourceModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);
  }
}

export default class DragDropModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    /**
     * Note: the 'initator' is the React component that *starts* the drag (e.g. drag handles)
     *       the 'source' is the React component that is *being* dragged (e.g. the entire row).
     *       the 'target' is a potential dropping point for a dragged item.
     */
    this.addProperty('isDragging', false);
    this.addProperty('dragInitiators', []);
    this.addProperty('dropTargets', []);
    this.addProperty('dragSource');
    this.addProperty('dropTarget');
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  addDragInitator(dragInitiator) {
    this.dragInitiators.push({dragInitiator});

    dragInitiator.rootDomNode.dragInitiator = dragInitiator;

    this.notify('dragInitiators');
  }

  hasDragInitiator(dragInitiator) {
    for (let i = 0; i < this.dragInitiators.length; i++) {
      if (this.dragInitiators[i].dragInitiator === dragInitiator) {
        return true;
      }
    }

    return false;
  }

  removeDragInitator(dragInitiator) {
    let ix = -1;

    this.dragInitiators.forEach((di, _ix) => {
      if (di.dragInitiator === dragInitiator) {
        ix = _ix;
      }
    });

    if (ix !== -1) {
      let ret = this.dragInitiators.splice(ix, 1);

      this.notify('dragInitiators');

      return ret;
    }

    return null;
  }

  hasDropTarget(dropTargetComponent) {
    for (let i = 0; i < this.dropTargets.length; i++) {
      if (this.dropTargets[i].dropTargetComponent === dropTargetComponent) {
        return true;
      }
    }

    return false;
  }

  addDropTarget(dropTargetComponent) {
    this.dropTargets.push({dropTargetComponent});

    this.notify('dropTargets');
  }

  getDropTargetByComponent(dropTargetComponent) {
    let ret= undefined;

    this.dropTargets.forEach(target => {
      if (target.dropTargetComponent === dropTargetComponent) {
        ret = target;
      }
    });

    return ret;
  }

  hasDropTargetComponent(dropTargetComponent) {
    return !!this.getDropTargetByComponent(dropTargetComponent);
  }

  removeDropTarget(dropTargetComponent) {
    let ix = -1;

    this.dropTargets.forEach((dt, _ix) => {
      if (dropTargetComponent === dt.dropTargetComponent) {
        ix = _ix;
      }
    });

    if (ix !== -1) {
      let ret = this.dropTargets.splice(ix, 1);

      this.notify('dropTargets');

      return ret;
    }

    return null;
  }
}