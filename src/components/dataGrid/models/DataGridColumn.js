import {Model} from 'ringa';

import DataGridField from './DataGridField';
import DataGridDimensionBase from './DataGridDimensionBase';

export default class DataGridColumn extends DataGridDimensionBase {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('width');
  }
}