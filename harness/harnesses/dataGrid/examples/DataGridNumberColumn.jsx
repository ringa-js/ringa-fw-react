import React from 'react';
import {DataGrid, DataGridModel, RingaComponent, DataGridNumberColumn} from '../../../../src/index';

export default class DataGridNumberColumn extends RingaComponent {
  constructor() {
    super();

    let items = [];

    for (let i = 0; i < 100; i++) {
      items.push({
        col1: Math.random() * 10,
        col2: Math.random() * 100,
        col3: Math.random() * 1000,
        col4: Math.random() * 10000
      });
    }

    this.dataGridModel = DataGridModel.constructDefaultRowColumnModel([
      new DataGridNumberColumn(),
      {field: 'col1'},
      {field: 'col2'},
      {field: 'col3'}
    ], items);
  }

  render() {
    return <div className="fill">
      <h1>1,000,000 Items</h1>
      <DataGrid model={this.dataGridModel} classes="fill" />
    </div>;
  }
}
