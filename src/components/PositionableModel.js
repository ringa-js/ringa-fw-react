import {Model} from 'ringa';

class PositionableModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('target');
    this.addProperty('position', 'auto'); // 'auto', 'top', 'bottom', 'left', 'right'
    this.addProperty('align');
    this.addProperty('shift');
    this.addProperty('forceInViewport', false);
    this.addProperty('positionAlternate');
    this.addProperty('alignAlternate');
    this.addProperty('shiftAlternate');
    this.addProperty('offset', {x: 0, y: 0});
    this.addProperty('width');
    this.addProperty('height');
    this.addProperty('maxWidth', 250);
    this.addProperty('maxHeight');
    this.addProperty('overflowX');
    this.addProperty('overflowY');
    this.addProperty('x');
    this.addProperty('y');
    this.addProperty('zIndex');
    this.addProperty('mouseDownOutsideHandler');
    this.addProperty('mouseLeaveHandler');
    this.addProperty('onPositionUpdateHandler');

    this.addProperty('trackMovement', true);
    this.addProperty('pollInterval', 15);

    this.addProperty('container'); // If container is set, all global coordinates are converted to coordinates within that container

    this.addProperty('$ringaAlternateParentComponent');

    if (values) {
      if (values.position !== 'centered' && !values.target && (values.x === undefined || values.y === undefined)) {
        console.error(`${this.constructor.name}(): you must provide a target (${values.target}) or an x (${values.x}) and y (${values.y}) coordinate!`);
      }
    }
  }
}

export default PositionableModel;