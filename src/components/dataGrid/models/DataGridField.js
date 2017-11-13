import {Model} from 'ringa';

export default class DataGridField extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('title');

    this.addProperty('propertyName'); // Used for references into an object
    this.addProperty('propertyIx');   // Used for references into an array

    this.addProperty('labelFunction');
  }
}