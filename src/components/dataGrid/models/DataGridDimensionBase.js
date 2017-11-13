import {Model} from 'ringa';

import DataGridField from './DataGridField';

/**
 * A DataGrid has multiple dimensions. Normally this would just be two:
 *
 * 1) Row
 * 2) Column
 *
 * Where Row is the index of the item in the array and Column is the field within the Object at that index.
 *
 * However, it is quite possible that someone might want to render in Row/Column order or have a third dimension of columns within a cell for example. So we just
 * made it super generic so you can do whatever you want.
 */
export default class DataGridDimension extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('field', {
      type: DataGridField
    });

    this.addProperty('baseRenderer');
    this.addProperty('arrayToRenderersMap');
  }
}