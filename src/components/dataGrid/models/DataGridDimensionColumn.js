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

    this.addProperty('setupDefaultColumnWidths', this._setupDefaultColumnWidths);

    this.addProperty('horizontalPadding', 10);
    this.addProperty('horizontalPaddingUnit', 'px');

    this.addProperty('verticalPadding', 5);
    this.addProperty('verticalPaddingUnit', 'px');

    this.direction = 'horizontal';

    this.itemRenderer = DataGridCellRenderer;

    this.setupDefaultColumnWidths.call(this);
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  get filteredItemsAsArray() {
    if (!(typeof this.parentObject === 'object')) {
      throw new Error('DataGridDimensionColumn expected an object but got this instead:', this.parentObject);
    }

    return this.columns.map(column => ({object: this.parentObject, column}));
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  _setupDefaultColumnWidths() {
    let unassignedColumns = this.columns.filter(column => column.width === undefined);

    let distributedWidth = 100 / unassignedColumns.length;

    unassignedColumns.forEach(column => {
      column.width = `calc(${distributedWidth}% - ${this.horizontalPadding * 2}${this.horizontalPaddingUnit})`;
    });
  }

  indexItem(trieSearch, ref) {
    // Row Number -> Next Item
    this.columns.forEach(column => {
      trieSearch.map(column.toLabel(ref.item.object), {
        item: ref.item.object,
        dimension: this
      });
    });
  }
}