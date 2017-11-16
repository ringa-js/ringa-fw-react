import React from 'react';
import {DataGrid, DataGridModel, DataGridRowDimension, DataGridColumnDimension, DataGridColumn, RingaComponent} from '../../../src/index';

class DataGridExample1 extends RingaComponent {
  constructor() {
    super();

    this.dataGridModel = new DataGridModel();

    this.dataGridModel.dimensions = [
      new DataGridRowDimension(),
      new DataGridColumnDimension({
        columns:[
          new DataGridColumn({field: 'firstName'}),
          new DataGridColumn({field: 'lastName'}),
          new DataGridColumn({field: 'email'})
        ]
      })
    ];
  }

  render() {
    return <DataGrid model={this.dataGridModel} />;
  }
}

export default DataGridExample1;
