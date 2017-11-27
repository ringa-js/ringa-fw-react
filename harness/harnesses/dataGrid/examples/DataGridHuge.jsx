import React from 'react';
import {DataGrid, DataGridModel, RingaComponent} from '../../../../src/index';

export default class DataGridHuge extends RingaComponent {
  constructor() {
    super();

    let items = [];

    for (let i = 0; i < 100000; i++) {
      items.push({
        col1: Math.random() * 10,
        col2: Math.random() * 100,
        col3: Math.random() * 1000,
        col4: Math.random() * 10000
      });
    }

    this.dataGridModel = DataGridModel.constructDefaultRowColumnModel([
      {field: 'col1'},
      {field: 'col2'},
      {field: 'col3'}
    ], items);
  }

  render() {
    return <DataGrid model={this.dataGridModel} classes="fill" />;
  }
}
