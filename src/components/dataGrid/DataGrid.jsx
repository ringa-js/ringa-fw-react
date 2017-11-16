import React from 'react';

import DataGridController from './controllers/DataGridController';

import DataGridComponentBase from './components/DataGridComponentBase';

import DataGridDimensionContextStack from './models/DataGridDimensionContextStack';

import DataGridDimensionRenderer from './components/DataGridDimensionRenderer';
import DataGridHeader from './components/DataGridHeader';
import DataGridFooter from './components/DataGridFooter';

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
    let {dataGridModel} = this.state;

    let cn = this.calcClassnames('data-grid');

    return <div className={cn}>
      <DataGridHeader />
      <DataGridDimensionRenderer dimension={dataGridModel} />
      <DataGridFooter />
    </div>;
  }
}
