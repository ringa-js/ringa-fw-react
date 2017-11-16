import {Model} from 'ringa';

import {ArrayCollection} from 'ringa-fw-core';

import DataGridDimensionBase from './DataGridDimensionBase';

export default class DataGridModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('columnDimension');

    this.addProperty('dimensions', [], {
      type: DataGridDimensionBase
    });

    this.addProperty('arrayCollection', undefined, {
      type: ArrayCollection
    });
  }
}