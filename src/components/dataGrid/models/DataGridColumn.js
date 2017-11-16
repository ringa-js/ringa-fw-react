import {Model} from 'ringa';

import DataGridColumnHeaderCellRenderer from '../components/renderers/DataGridColumnHeaderCellRenderer';

export default class DataGridColumn extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('headerCellRenderer', DataGridColumnHeaderCellRenderer);

    this.addProperty('width');
    this.addProperty('field');
  }
}