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
  _buildDataIterator(data) {
    if (data instanceof Array && data[0].fieldOrIx === undefined) {
      console.error('Attempting to use a DataGridDimensionColumn to iterate over data that is not an Object!', this, data);
    }

    let cix = 0;

    // Are we iterating over our filteredData (which is DataGridNodeContext) objects?
    if (data instanceof Array) {
      return {
        next: () => {
          let item = data[cix++];

          if (item === undefined) {
            return undefined;
          }

          return {
            fieldOrIx: item.fieldOrIx,
            data: item.data,
            column: item.column,
            id: item.id
          };
        }
      };
    }

    // Are we iterating over our raw data (which is an Object)?
    return {
      next: () => {
        let column = this.columns[cix++];

        if (!column) {
          return undefined;
        }

        let {field} = column;

        return {
          fieldOrIx: field,
          data,
          column,
          id: field.propertyName
        }
      }
    };
  }

  getItemRendererFor(iteratee) {
    return this.itemRenderer;
  }

  getNextDimensionFor(ref) {
    return ref.column.dimension;
  }

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