import {Model} from 'ringa';

export default class DataGridHeaderSettings extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('showFunctions', true);
    this.addProperty('showSearch', true);
    this.addProperty('title', '');
  }
}