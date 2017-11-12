import {Model} from 'ringa';

export default class InspectModel extends Model {
  constructor() {
    super();

    this.addProperty('inspectee');
    this.addProperty('inspectComponent');
    this.addProperty('top', true);
  }
}
