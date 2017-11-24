import {Model} from 'ringa';

export default class DataGridDescriptorField extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('title');

    this.addProperty('propertyName');

    this.addProperty('labelFunction');
  }
}