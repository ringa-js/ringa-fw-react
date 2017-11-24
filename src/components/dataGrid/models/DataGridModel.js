import {Model} from 'ringa';

import {ArrayCollection} from 'ringa-fw-core';

import DataGridDimension from './DataGridDimension';
import DataGridDimensionRow from './DataGridDimensionRow';
import DataGridDimensionColumn from './DataGridDimensionColumn';
import DataGridDescriptorColumn from './DataGridDescriptorColumn';

export default class DataGridModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('dimensions', [], {
      type: DataGridDimension
    });

    this.addProperty('items', undefined, {
      type: ArrayCollection
    });
  }

  //-----------------------------------
  // Statics
  //-----------------------------------
  static constructDefaultRowColumnModel(columns, data) {
    let finalItems;

    if (data) {
      if (data instanceof ArrayCollection) {
        finalItems = data;
      } else {
        finalItems = new ArrayCollection({data});
      }
    }

    return new DataGridModel({
      dimensions: [
        new DataGridDimensionRow(),
        new DataGridDimensionColumn({columns: columns.map(column => new DataGridDescriptorColumn(column))})
      ],
      items: finalItems
    });
  }
}