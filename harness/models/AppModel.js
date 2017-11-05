import {Model} from 'ringa';

export default class AppModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name) {
    super(name);

    this.addProperty('initialized', false);
  }
}
