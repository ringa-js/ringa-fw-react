import React from 'react';

import DataGridController from './controllers/DataGridController';

import DataGridComponentBase from './components/DataGridComponentBase';
import DataGridDimensionContext from './models/DataGridDimensionContext';

export default class DataGrid extends DataGridComponentBase {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    if (!props.useCustomDataGridController) {
      this.attach(new DataGridController(undefined, undefined, props.model));
    }
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {dataGridModel} = this.state;

    const cn = this.calcClassnames('data-grid');

    let startDimensionIx = 0;
    let dimension = dataGridModel.dimensions[startDimensionIx];
    let DimensionRenderer = dimension.dimensionRenderer;
    let context = new DataGridDimensionContext(startDimensionIx, dataGridModel.items, undefined, dataGridModel);

    return <div className={cn}>
      <DimensionRenderer context={context} />
    </div>;
  }
}
