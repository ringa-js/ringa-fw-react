import DataGridDimension from './DataGridDimension';
import DataGridCellRenderer from '../components/renderers/DataGridCellRenderer';

export default class DataGridDimensionColumn extends DataGridDimension {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('columns', [], {
      type: DataGridDimensionColumn
    });

    this.direction = 'horizontal';

    this.itemRenderer = DataGridCellRenderer;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  itemsAsArray(object) {
    if (!(typeof object === 'object')) {
      throw new Error('DataGridDimensionColumn expected an object but got this instead:', object);
    }

    return this.columns.map(column => ({object, column}));
  }
}