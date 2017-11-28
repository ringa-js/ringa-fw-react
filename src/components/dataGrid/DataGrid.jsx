import React from 'react';

import DataGridController from './controllers/DataGridController';

import DataGridComponentBase from './components/DataGridComponentBase';

import DataGridModel from './models/DataGridModel';

import {dependency} from 'react-ringa';

export default class DataGrid extends DataGridComponentBase {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    if (!props.useCustomDataGridController) {
      this.attach(new DataGridController(undefined, undefined, props.model));
    }

    this.depend(dependency(DataGridModel, ['change', 'items']));
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {dataGridModel} = this.state;

    const cn = this.calcClassnames('data-grid', dataGridModel.classes);

    let nodeContext = dataGridModel.rootNodeContext;

    if (nodeContext) {
      let DimensionRenderer = nodeContext.dimension.dimensionRenderer;

      return <div className={cn}>
        <DimensionRenderer nodeContext={nodeContext}/>
      </div>;
    }

    return <div className={cn}>No data provided.</div>;
  }
}
